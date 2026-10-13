import PcModel from "../components/PcModel";

function PcPreview() {
  return (
    <main style={{ minHeight: "100vh", background: "#08090a", paddingTop: 90 }}>
      <div style={{ height: "calc(100vh - 110px)", minHeight: 420, maxWidth: 1000, margin: "0 auto" }}>
        <PcModel />
      </div>
    </main>
  );
}

export default PcPreview;
