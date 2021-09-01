interface CourseProps {
  name: string;
  price: number;
}

export const Course = ({ name, price }: CourseProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "5rem",
        border: "1px solid gray",
        marginBlockEnd: "1rem",
        alignItems: "center",
      }}
    >
      <h3>{name}</h3> <h4>€ {price}</h4>
    </div>
  );
};
