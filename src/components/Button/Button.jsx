const Button = ({ onclick }) => {
  return (
    <>
      <button type="button" className="button" onClick={() => onclick}>
        Load More...
      </button>
    </>
  );
};

export default Button;
