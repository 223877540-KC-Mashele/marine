import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerIcon from '../assets/banner-icon.jpg';
import { FaAlignJustify, FaPaperPlane } from 'react-icons/fa'; // Add icon import
import { LuSendHorizonal } from 'react-icons/lu';
import { MdOutlineCancel } from 'react-icons/md';

const Home = () => {
  const [posts, setPosts] = useState([
    {
      username: 'John Doe',
      location: 'New York, USA',
      postTitle: 'Sample Post Title',
      postText:
        'This is a sample post text to showcase a default post while we wait for more.',
      time: 'November 19, 2024',
      image: '', // You can also add a sample image if desired
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostImagePreview, setNewPostImagePreview] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostText.trim()) {
      setPosts([
        ...posts,
        {
          username: 'John Doe',
          location: 'New York, USA',
          postTitle: newPostTitle,
          postText: newPostText,
          time: 'November 19, 2024',
          image: newPostImagePreview,
        },
      ]);
      setNewPostTitle('');
      setNewPostText('');
      setNewPostImage(null);
      setNewPostImagePreview('');
      setIsModalOpen(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = (height * MAX_WIDTH) / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (width * MAX_HEIGHT) / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const resizedImage = canvas.toDataURL('image/jpeg');
          setNewPostImagePreview(resizedImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostClick = (index) => {
    navigate(`/post/${index}`, { state: { post: posts[index] } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <div style={styles.welcomeContainer}>
          <h2>Welcome, John Doe</h2>
        </div>
      </div>

      <div style={styles.bannerSection}>
        <div style={styles.bannerContent}>
          <h3>Explore Species</h3>
          <p>
            Discover a wide variety of amazing species from around the world.
            Learn more about their habitats, characteristics, and more.
          </p>
          <button style={styles.bannerButton}>Learn More</button>
        </div>
        <div style={styles.bannerImage}>
          <img src={bannerIcon} alt="Explore Species" style={styles.image} />
        </div>
      </div>

      <div style={styles.newsFeed}>
        <h3 style={styles.newsFeedText}>News Feed</h3>
      </div>

      <div style={styles.createPostButtonContainer}>
        <button
          style={styles.createPostButton}
          onClick={() => setIsModalOpen(true)}
        >
          Create Post
        </button>
      </div>

      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <input
              type="text"
              placeholder="Post Title"
              style={styles.inputField}
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <textarea
              placeholder="Write something..."
              style={styles.textArea}
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            {newPostImagePreview && (
              <img
                src={newPostImagePreview}
                alt="Preview"
                style={styles.imagePreview}
              />
            )}
            <div style={styles.modalActions}>
              <button style={styles.submitButton} onClick={handleCreatePost}>
                <LuSendHorizonal size={30} color="#007bff" />
              </button>
              <button
                style={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.cardSection}>
        {posts.length === 0 ? (
          <p>No posts yet. Create a post to start.</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => handlePostClick(index)}
            >
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  <span style={styles.avatarText}>JD</span>
                </div>
                <div style={styles.userDetails}>
                  <h4 style={styles.username}>{post.username}</h4>
                  <p style={styles.location}>{post.location}</p>
                </div>
              </div>
              <div style={styles.postText}>
                <h4 style={styles.postTitle}>{post.postTitle}</h4>
                <p style={styles.post}>{post.postText}</p>
              </div>
              {post.image && (
                <img src={post.image} alt="Post" style={styles.postImage} />
              )}
              <div style={styles.dateTime}>
                <p style={styles.time}>Posted on: {post.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  topSection: {
    marginBottom: '20px',
  },
  bannerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#1f53d5',
  },
  bannerContent: {
    marginLeft: '20px',
    color: '#ffffff',
    flex: 2,
  },
  bannerButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  bannerImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: '300px',
    borderRadius: '12px',
  },
  newsFeed: {
    marginBottom: '20px',
  },
  newsFeedText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  createPostButtonContainer: {
    marginBottom: '20px',
  },
  createPostButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    textAlign: 'center',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #1f53d5',
    fontSize: '16px',
    color: 'black',
    font: 'Arial',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #1f53d5',
    fontSize: '16px',
    color: 'black',
    font: 'Arial',
  },
  fileInput: {
    marginBottom: '10px',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '400px',
    marginTop: '10px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  cardSection: {
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
  },
  avatarText: {
    color: '#fff',
    fontSize: '18px',
  },
  userDetails: {
    fontSize: '14px',
  },
  username: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  location: {
    fontSize: '12px',
    color: '#666',
  },
  postText: {
    marginTop: '10px',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  post: {
    fontSize: '14px',
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '10px',
  },
  dateTime: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#aaa',
  },
  time: {
    textAlign: 'center',
  },
};

export default Home;
