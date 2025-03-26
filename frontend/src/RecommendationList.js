export default function RecommendationList({ data }) {
    return (
      <div style={{ whiteSpace: "pre-line", padding: "1rem" }}>
        {data?.map((line, idx) => <p key={idx}>{line}</p>)}
      </div>
    );
  }