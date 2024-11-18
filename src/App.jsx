import React, { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";
import "./App.css";
import Card from "./components/Card";
import { useOutletContext } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("newest");
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase.from("Posts").select();
      if (error) {
        console.error("Error fetching posts", error);
      } else {
        const filteredPosts = data.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (orderBy === "popular") {
          filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
        } else {
          filteredPosts.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        }

        setPosts(filteredPosts);
      }
    };
    fetchPosts();
  }, [orderBy, searchQuery]);

  const handleOrderByNewest = () => {
    setOrderBy("newest");
  };

  const handleOrderByPopular = () => {
    setOrderBy("popular");
  };

  return (
    <div className="app">
      <h1 className="app-title">Wlecome to Apolo, the house of music lovers</h1>
      <p>
        Here you can share your favorite music with the world. Click on the
        Create Post button to get started.
      </p>
      <div className="order-buttons">
        <p>Order By </p>
        <button className="order-button" onClick={handleOrderByNewest}>
          Newest
        </button>
        <button className="order-button" onClick={handleOrderByPopular}>
          Most Popular
        </button>
      </div>
      <div className="home-feed">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image}
              upvotes={post.upvotes}
              created_at={post.created_at}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default App;