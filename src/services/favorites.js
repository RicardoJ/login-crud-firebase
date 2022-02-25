const getPosts = async () => {
  const data = await fetch(`${process.env.REACT_APP_ENDPOINT}/posts/all`);
  const favorites = await data.json();

  return favorites.data;
};

const createPost = async (title, content, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        body: content,
        user_uuid: id
      })
    });
    const data = await response.json();

    console.log(data.data);
  } catch (error) {
    console.log(error);
  }
};

export { getPosts, createPost };
