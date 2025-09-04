export const Widget = ({ description, value }) => {
  return (
    <article className="app-widget">
      <h1>{value}</h1>
      <p>{description}</p>
    </article>
  );
};
