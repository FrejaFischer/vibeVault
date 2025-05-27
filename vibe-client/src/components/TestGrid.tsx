import { useAlbums } from "../hooks/useAlbums";

// THIS IS A TEST COMPONENT

const TestGrid = () => {
  const { albums, loading, error } = useAlbums();

  if (loading) return <p>Loading tests...</p>;
  if (error)
    return (
      <section>
        <p>We are very sorry, but an error occured while loading albums. Please come back later</p>
        <p>({error.message})</p>
      </section>
    );

  return (
    <ul>
      {albums.map((album) => (
        <li key={album.album_id}>
          {album.title} (Artist ID: {album.artist_id})
        </li>
      ))}
    </ul>
  );
};

export default TestGrid;
