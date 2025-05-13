import { useTests } from "../hooks/useTests";

const TestGrid = () => {
  const { testData, loading, error } = useTests();

  if (loading) return <p>Loading tests...</p>;
  if (error) return <p>Error loading tests: {error.message}</p>;

  return (
    <ul>
      {testData.map((test) => (
        <li key={test.id}>
          {test.name} ({test.role})
        </li>
      ))}
    </ul>
  );
};

export default TestGrid;
