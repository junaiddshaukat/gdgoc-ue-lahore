'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, Edit2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Adjust this import path as needed
import axios from 'axios';

export default function UpcomingEvents({
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
}) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    image: '',
    color: googleColors?.blue || '#4285F4',
    mainpage_url: '',
    type: "upcoming",
    Gallery_Images: []
  });
  const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ visible: false, message: '', success: false });
  const [isEdit, setIsEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadImageBtn, setUploadImageBtn] = useState("UPLOAD");

  const uploadImageToFirebase = async (file) => {
    if (!file) return null;

    const imageRef = ref(storage, `upcomingevent/${file.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setNotification({ visible: true, message: 'Image upload failed.', success: false });
      return null;
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = await uploadImageToFirebase(file);
      setNewEvent(prev => ({ ...prev, image: url }));
    }
  };

  const submitFiles = async () => {
    if (files.length > 0) {
      setUploadImageBtn("UPLOADING...");
      const uploadedUrls = await Promise.all(
        Array.from(files).map(file => uploadImageToFirebase(file))
      );
      setNewEvent(prev => ({
        ...prev,
        Gallery_Images: [...prev.Gallery_Images, ...uploadedUrls.filter(url => url !== null)]
      }));
      setFiles([]);
      setUploadImageBtn("UPLOAD");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteImage = (index) => {
    setNewEvent(prev => ({
      ...prev,
      Gallery_Images: prev.Gallery_Images.filter((_, i) => i !== index)
    }));
  };

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
      const allEvents = response.data.Events;
      setEvents({
        upcoming: allEvents.filter(event => event.type === "upcoming"),
        past: allEvents.filter(event => event.type === "past")
      });
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
        setNotification({...notification, visible: true, message: 'Event deleted successfully', success: true});
        await fetchEvents();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      setNotification({visible: true, message: 'Error deleting event', success: false});
    } finally {
      setIsLoading(false);
    }
  };

  const addEvent = async () => {
    try {
      const response = await axios.post('http://localhost:3001/upcomingevent/createevent', newEvent);
      setNotification({ visible: true, message: 'Event created successfully', success: true });
      await fetchEvents();
      setNewEvent({
        title: '',
        description: '',
        image: '',
        color: googleColors?.blue || '#4285F4',
        mainpage_url: '',
        type: "upcoming",
        Gallery_Images: []
      });
    } catch (error) {
      console.error("Error adding Event:", error);
      setNotification({ visible: true, message: 'Something went wrong', success: false });
    }
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setNewEvent({
      title: '',
      description: '',
      image: '',
      color: googleColors?.blue || '#4285F4',
      mainpage_url: '',
      type: "upcoming",
      Gallery_Images: []
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {notification.visible && (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 mt-4 rounded-md shadow-md ${notification.success ? 'bg-green-200' : 'bg-red-200'}`}>
          <div className="flex justify-between items-center gap-3">
            <p className="text-sm text-gray-800">{notification.message}</p>
            <button onClick={closeNotification} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              &times;
            </button>
          </div>
        </div>
      )}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle style={{ color: googleColors?.green || '#34A853' }}>{isEdit ? 'Edit Event' : 'Add Event'}</CardTitle>
          {isEdit && (
            <Button
              size="sm"
              variant="ghost"
              onClick={cancelEdit}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
                  src={newEvent.image}
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
                onChange={handleFileInputChange}
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
            <div className="flex items-center space-x-2">
              <input 
                type='checkbox'
                id="past"
                className='w-5 h-5'
                checked={newEvent.type === "past"}
                onChange={() => setNewEvent({...newEvent, type: "past"})}
              />
              <label htmlFor="past">Past event</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type='checkbox'
                id="upcoming"
                className='w-5 h-5'
                checked={newEvent.type === "upcoming"}
                onChange={() => setNewEvent({...newEvent, type: "upcoming"})}
              />
              <label htmlFor="upcoming">Upcoming event</label>
            </div>
            {newEvent.type === "past" && (
              <div>
                <div>Gallery Images</div>
                <div className='flex mt-3'>
                  <input 
                    onChange={(e) => setFiles(e.target.files)} 
                    type='file' 
                    className='w-full outline-none p-2 bg-slate-100 border' 
                    accept='image/*' 
                    multiple
                  />
                  <button 
                    onClick={submitFiles}  
                    type='button' 
                    className='p-3 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white hover:duration-500'
                  >
                    {uploadImageBtn}
                  </button>
                </div>
                {newEvent.Gallery_Images.map((url, index) => (
                  <div key={index} className='flex justify-between p-2 border border-black'>
                    <img src={url} className='w-[80px]' alt={`Uploaded ${index}`} />
                    <button type='button' className='text-red-700' onClick={() => deleteImage(index)}>DELETE</button>
                  </div>
                ))}
              </div>
            )}
            <Button
              onClick={addEvent}
              style={{ backgroundColor: googleColors?.green || '#34A853', color: 'white' }}
            >
              <Plus className="mr-2 h-4 w-4" /> {isEdit ? 'Update Event' : 'Add Event'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle style={{ color: googleColors?.green || '#34A853' }}>Upcoming Events</CardTitle>
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
              {events.upcoming.map((event) => (
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
                  <div className='flex gap-2'>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEvent(event._id)}
                      style={{ backgroundColor: googleColors?.red || '#EA4335' }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setIsEdit(true);
                        setNewEvent(event);
                      }}
                      style={{ backgroundColor: googleColors?.green || '#34A853' }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle style={{ color: googleColors?.green || '#34A853' }}>Past Events</CardTitle>
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
              {events.past.map((event) => (
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
                  <div className='flex gap-2'>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEvent(event._id)}
                      style={{ backgroundColor: googleColors?.red || '#EA4335' }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setIsEdit(true);
                        setNewEvent(event);
                      }}
                      style={{ backgroundColor: googleColors?.green || '#34A853' }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}