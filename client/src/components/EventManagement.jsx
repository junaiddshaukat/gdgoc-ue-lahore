import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

import axios from 'axios';

const EventManagement = ({
  handleDragOver,
  handleDragLeave,
  handleDrop,

  isDragging,
  googleColors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853'
  }
}) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    image: null,
    color: googleColors?.blue || '#4285F4',
    mainpage_url: ''
  });
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const uploadImageToFirebase = async (file) => {
    if (!file) return null;

    const imageRef = ref(storage, `upcomingevent/${file.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };


  const handleFileInputChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewEvent({ ...newEvent, image: file });
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/upcomingevent/getallevent", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setEvents(response.data.Events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeEvent = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`http://localhost:3001/upcomingevent/deletevent/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      if (response.data.Event) {
        await fetchEvents();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEvent = async() => {
    if (newEvent.image) {
    const url=await  uploadImageToFirebase(newEvent.image)
    setNewEvent({...newEvent,image:url})
    console.log(newEvent)
     
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle style={{ color: googleColors?.green || '#34A853' }}>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                isDragging ? 'border-green-500' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'event')}
              onClick={() => document.getElementById('eventFileInput').click()}
            >
              {newEvent.image ? (
                <img
                  src={URL.createObjectURL(newEvent.image)}
                  alt="Preview"
                  className="max-h-32 mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <ArrowUp className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm text-gray-500">
                    Drag and drop an image or click to select
                  </p>
                </div>
              )}
              <input
                id="eventFileInput"
                type="file"
                onChange={(e) => handleFileInputChange(e, 'event')}
                accept="image/*"
                className="hidden"
              />
            </div>
            <Select
              onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}
              defaultValue={newEvent.color}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={googleColors?.blue || '#4285F4'}>Blue</SelectItem>
                <SelectItem value={googleColors?.red || '#EA4335'}>Red</SelectItem>
                <SelectItem value={googleColors?.yellow || '#FBBC05'}>Yellow</SelectItem>
                <SelectItem value={googleColors?.green || '#34A853'}>Green</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Main Page URL"
              value={newEvent.mainpage_url}
              onChange={(e) => setNewEvent({ ...newEvent, mainpage_url: e.target.value })}
            />
            <Button
              onClick={addEvent}
              style={{ backgroundColor: googleColors?.green || '#34A853', color: 'white' }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle style={{ color: googleColors?.green || '#34A853' }}>Events</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="relative w-16 h-16">
                {[googleColors?.red || '#EA4335', googleColors?.blue || '#4285F4', googleColors?.yellow || '#FBBC05', googleColors?.green || '#34A853'].map((color, index) => (
                  <div
                    key={color}
                    className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-4 border-solid animate-spin"
                    style={{
                      borderColor: `${color} transparent transparent transparent`,
                      animationDuration: '1.2s',
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                  style={{ borderLeft: `4px solid ${event.color}` }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeEvent(event._id)}
                    style={{ backgroundColor: googleColors?.red || '#EA4335' }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventManagement;