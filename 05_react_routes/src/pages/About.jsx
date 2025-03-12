import { useSearchParams } from "react-router-dom";

const About = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const age = searchParams.get("age");

  return (
    <div className="centered">
      <h1>About page</h1>
      <p><strong>username:</strong> {username}</p>
      <p><strong>age:</strong> {age}</p>
    </div>
  );
};

export default About;
