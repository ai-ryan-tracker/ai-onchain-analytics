import "./AICreateNFT.css";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AICreateNFT = ({ Data }) => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const generatePreview = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    setGenerating(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate image preview');
      }

      if (!data?.data?.imageUrl) {
        throw new Error('Image generation returned an unexpected response');
      }

      setImageUrl(data.data.imageUrl);
    } catch (err) {
      setError(err.message || 'Failed to generate image preview');
    } finally {
      setGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "softgalaxy-ai-nft.png";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | AI Create NFT</title>
        <meta name="description" content="Create NFT with AI by inputting sentences" />
      </Helmet>

      <section id="aiCreate" className="aiCreateSection py-5">
        <div className="container">
          <div className="row pageTitle mb-4">
            <div className="col-12">
              <span className="d-block F1 textS1">
                <span className="lemon">AI</span> Create
              </span>
              <span className="d-block F3 textS2">Describe your idea and generate an NFT preview</span>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <label className="d-block mb-2">Write a descriptive prompt</label>
              <textarea
                className="w-100 promptInput"
                rows={8}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A colorful neon fox astronaut floating in a pastel galaxy, detailed, vibrant, cinematic"
              />
              <small className="d-block mt-2 text-muted">
                Be specific about the subject, style, colors, and mood so the image stays closer to your idea.
              </small>

              <div className="mt-3 d-flex gap-2">
                <button className="generateBtn d-flex align-items-center" onClick={generatePreview} disabled={generating || !prompt}>
                  {generating && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                  {generating ? "Generating..." : "Generate Preview"}
                </button>
                <button className="downloadBtn" onClick={downloadImage} disabled={!imageUrl}>
                  Download PNG
                </button>
              </div>

              <div className="mt-4">
                {error ? (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : (
                  <small className="text-muted">Generate an AI image preview from your prompt.</small>
                )}
              </div>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-center align-items-start">
              <div className="previewCard p-3 w-100 h-100 d-flex flex-column align-items-center">
                {generating && !imageUrl ? (
                  <div className="skeletonPreview w-100 h-100 rounded" />
                ) : imageUrl ? (
                  <img src={imageUrl} alt="AI preview" className="img-fluid previewImg" />
                ) : (
                  <div className="emptyPreview">Your preview will appear here</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AICreateNFT;
