import React, { useEffect, useState } from 'react';
import '../../../../styles/home.css';
import { auth, db, logout } from '../../../../config/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Box } from '@material-ui/core';
import { createPost, getPosts } from '../../../../services/favorites';
import { Header } from '../../../components/header';
import { Form } from '../../../components/form';
import { List } from '../../../components/list';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Home = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPost] = useState();
  const [newFavorites, setNewFavorites] = useState({
    content: '',
    title: ''
  });
  const [listNewfavorites, setListNewFavorites] = useState([]);

  useEffect(() => {
    const favorites = async () => {
      const res = await getPosts();
      setIsLoading(false);
      setPost(res);
    };
    favorites();
  }, []);

  useEffect(() => {
    getNewFavorites();
  }, []);

  const getNewFavorites = async () => {
    const result = await getDocs(collection(db, 'favorites'));
    setListNewFavorites(result.docs.map((document) => document.data()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost(newFavorites.title, newFavorites.content, user.uid);
    setPost([...posts, { ...newFavorites }]);
    setNewFavorites(() => ({
      content: '',
      title: ''
    }));
  };

  const handleFavAddClick = async (favorite) => {
    setListNewFavorites((preState) => [...preState, favorite]);
    try {
      await addDoc(collection(db, 'favorites'), favorite);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFav = async (favorite) => {
    await deleteDoc(doc(db, 'favorites', favorite.id.toString()));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header logout={logout} />
      <section className="container">
        <section className="content">
          <div className="new-favorites">
            <Form
              title={newFavorites.title}
              content={newFavorites.content}
              setNewFavorites={setNewFavorites}
              handleSubmit={handleSubmit}
            />
            <div>
              <h3>Lista posts favoritos</h3>
              <List
                isLoading={isLoading}
                onClick={handleDeleteFav}
                list={listNewfavorites && listNewfavorites}
                buttonName="Delete"
              />
            </div>
          </div>
          <div>
            <h2>Posts</h2>
            <List
              isLoading={isLoading}
              onClick={handleFavAddClick}
              list={posts && posts}
              buttonName="Fav"
            />
          </div>
        </section>
      </section>
    </Box>
  );
};
