import axios from "axios"
import { useState } from "react"
import goatImage from "../assets/goat.webp"
import dancingCat from "../assets/cat-dancing.gif"
import drawingCat from "../assets/drawing.gif"

const Nvidia = () => {
  const [text, setText] = useState("")
  const [generating, setGenerating] = useState(false)
  const [image, setImage] = useState(null)

  const invokeUrl = `${import.meta.env.VITE_API_URL}/generate-image`

  const generateImage = async () => {
    const payload = {
      text_prompts: [
        {
          text: text,
          weight: 1,
        },
        {
          text: "",
          weight: -1,
        },
      ],
      cfg_scale: 5,
      sampler: "K_DPM_2_ANCESTRAL",
      seed: 0,
      steps: 25,
    }

    try {
      setGenerating(true)
      setImage(null)
      const res = await axios.post(invokeUrl, payload)

      const imageData = res.data.artifacts[0].base64

      setImage(`data:image/jpeg;base64,${imageData}`)
      setGenerating(false)
    } catch (error) {
      console.log("The error: ", error)
    }
  }

  const handleInput = e => {
    setText(e.target.value)
  }

  return (
    <div className="container">
      <div className="main-container">
        <div className="title-and-input">
          <div className="text-and-cat">
            <h3>Hello there, start generating now!</h3>
            <img className="dancing-cat" src={dancingCat} alt="" />
          </div>

          <div id="input-field">
            <input
              onChange={handleInput}
              placeholder="a happy goat with others in the background"
            />

            <button onClick={generateImage}>Generate</button>
          </div>
        </div>

        <img
          className="generated-image"
          src={generating ? drawingCat : image ? image : goatImage}
          alt=""
        />
      </div>
      <footer className="footer">Made with ❤️ by Aayush Dhungel</footer>
    </div>
  )
}

export default Nvidia
