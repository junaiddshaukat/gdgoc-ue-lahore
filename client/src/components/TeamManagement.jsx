import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { storage } from "./firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const TeamManagement = ({ 
 
  handleDragOver,
  handleDragLeave,
  handleDrop,

  isDragging,
  googleColors 
}) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ visible: false, message: '', success: false });

    
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    image: null,
    linkedin: '',
    github: '',
    level: 1
  });
  const uploadImageToFirebase = async (file) => {
    if (!file) return null;

    const imageRef = ref(storage, `teammember/${file.name}`);
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


  const handleFileInputChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewMember({ ...newMember, image: file });

    }
    
  };
  
 const putdata=async(data)=>{

  try {
    const response = await axios.post('http://localhost:3001/team/createmember', data);
    console.log(response.data)
    setNotification({ visible: true, message: 'Member created successfully', success: true })
   fetchTeam();
  

  //  setNotification({ visible: true, message: 'Event created successfully!', success: true }); // Show success notification
  } catch (error) {
    console.error("Error adding Memeber:", error);
    setNotification({ visible: true, message: 'Something went wrong', success: false })
    //setNotification({ visible: true, message: 'Failed to create book due to an error.', success: false }); // Show error notification
  }
};


  const addTeamMember = async() => {
  if(newMember.image){
    const urls=await  uploadImageToFirebase(newMember.image)
    let newmember={}
     setNewMember((pre)=>{
      newmember={...pre,image:urls}
      return newmember;
     })

     putdata(newmember)
     setNewMember({
      name: '',
      position: '',
      image: null,
      linkedin: '',
      github: '',
      level: 1
    })
  }
  
  };

  useEffect(() => {
    fetchTeam();
  }, []);


  const removeTeamMember = async(id) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
      const response = await axios.delete(`http://localhost:3001/team/deletemember/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

  
      if(response.data.Member) {
        fetchTeam();
      } else {
        console.log("member not found");
      }
    } catch(err) {
      console.log("something went wrong", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTeam = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/team/getallmembers", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setTeamMembers(response.data.Team);
    } catch (error) {
      console.error("Error fetching Team:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };


  return (
    <div className="max-w-2xl mx-auto">
          {notification.visible && (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 mt-4 rounded-md shadow-md ${notification.success ? 'bg-green-200' : 'bg-red-200'}`}>
          <div className="flex justify-between items-center gap-3">
            <p className="text-sm text-gray-800">{notification.message}</p>
            <button onClick={closeNotification} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              &times; {/* Close button */}
            </button>
          </div>
        </div>
      )}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle style={{ color: googleColors.blue }}>Add Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <Input
              placeholder="Position"
              value={newMember.position}
              onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
            />
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                isDragging ? 'border-blue-500' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'member')}
              onClick={() => document.getElementById('memberFileInput').click()}
            >
              {newMember.image ? (
                <img
                  src={URL.createObjectURL(newMember.image)}
                  alt="Preview"
                  className="max-h-32 mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <ArrowUp className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-500">
                    Drag and drop an image or click to select
                  </p>
                </div>
              )}
              <input
                id="memberFileInput"
                type="file"
                onChange={(e) => handleFileInputChange(e, 'member')}
                accept="image/*"
                className="hidden"
              />
            </div>
            <Input
              placeholder="LinkedIn URL"
              value={newMember.linkedin}
              onChange={(e) => setNewMember({ ...newMember, linkedin: e.target.value })}
            />
            <Input
              placeholder="GitHub URL"
              value={newMember.github}
              onChange={(e) => setNewMember({ ...newMember, github: e.target.value })}
            />
            <Select
              onValueChange={(value) =>
                setNewMember({ ...newMember, level: parseInt(value) })
              }
              defaultValue={newMember.level.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Level 1</SelectItem>
                <SelectItem value="2">Level 2</SelectItem>
                <SelectItem value="3">Level 3</SelectItem>
                <SelectItem value="4">Level 4</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={addTeamMember}
              style={{ backgroundColor: googleColors.blue, color: 'white' }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Team Member
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle style={{ color: googleColors.blue }}>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div
                key={member._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                style={{ borderLeft: `4px solid ${Object.values(googleColors)[index % 4]}` }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeTeamMember(member._id)}
                  style={{ backgroundColor: googleColors.red }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="google-loader">
            <div style={{ backgroundColor: googleColors.blue }}></div>
            <div style={{ backgroundColor: googleColors.red }}></div>
            <div style={{ backgroundColor: googleColors.yellow }}></div>
            <div style={{ backgroundColor: googleColors.green }}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .google-loader {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .google-loader div {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          animation: google-loader 1.2s linear infinite;
        }
        .google-loader div:nth-child(1) {
          left: 8px;
          animation-delay: 0s;
        }
        .google-loader div:nth-child(2) {
          left: 32px;
          animation-delay: -0.4s;
        }
        .google-loader div:nth-child(3) {
          left: 56px;
          animation-delay: -0.8s;
        }
        .google-loader div:nth-child(4) {
          left: 80px;
          animation-delay: -1.2s;
        }
        @keyframes google-loader {
          0% {
            top: 33px;
            height: 13px;
          }
          50%, 100% {
            top: 24px;
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamManagement;