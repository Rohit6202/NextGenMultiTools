// ===== MAIN NAVIGATION & UI FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  })

  // Modal functionality
  const modalContainer = document.getElementById("modal-container")
  const modalTitle = document.getElementById("modal-title")
  const modalContent = document.getElementById("modal-content")
  const modalClose = document.querySelector(".modal-close")
  const toolButtons = document.querySelectorAll(".btn-tool")
  const toolLinks = document.querySelectorAll("[data-tool]")

  // Function to open modal with specific tool
  function openToolModal(toolId) {
    const toolName = toolId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    modalTitle.textContent = toolName
    modalContent.innerHTML = "" // Clear previous content

    // Load tool content based on toolId
    const toolContent = createToolContent(toolId)
    modalContent.appendChild(toolContent)

    modalContainer.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  // Close modal function
  function closeModal() {
    modalContainer.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  }

  // Add click event to all tool buttons
  toolButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const toolId = this.closest(".tool-card").dataset.tool
      openToolModal(toolId)
    })
  })

  // Add click event to all tool links in footer
  toolLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const toolId = this.dataset.tool
      openToolModal(toolId)
    })
  })

  // Close modal when clicking the close button
  if (modalClose) {
    modalClose.addEventListener("click", closeModal)
  }

  // Close modal when clicking outside the modal content
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      closeModal()
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("active")) {
      closeModal()
    }
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Validate form (simple validation)
      if (!name || !email || !message) {
        showNotification("Please fill in all fields", "error")
        return
      }

      // In a real application, you would send this data to a server
      // For this demo, we'll just show a success message
      showNotification("Message sent successfully!", "success")
      contactForm.reset()
    })
  }
})

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification")
  const notificationMessage = document.getElementById("notification-message")

  // Set message and type
  notificationMessage.textContent = message
  notification.className = "notification"
  notification.classList.add(type)

  // Show notification
  notification.classList.add("active")

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("active")
  }, 3000)
}

// ===== TOOL CONTENT CREATION =====
function createToolContent(toolId) {
  const toolContainer = document.createElement("div")
  toolContainer.className = "tool-container"

  // Create tool content based on toolId
  switch (toolId) {
    case "image-converter":
      toolContainer.appendChild(createImageConverterTool())
      break
    case "image-compressor":
      toolContainer.appendChild(createImageCompressorTool())
      break
    case "image-cropper":
      toolContainer.appendChild(createImageCropperTool())
      break
    case "video-converter":
      toolContainer.appendChild(createVideoConverterTool())
      break
    case "audio-converter":
      toolContainer.appendChild(createAudioConverterTool())
      break
    case "audio-trimmer":
      toolContainer.appendChild(createAudioTrimmerTool())
      break
    case "age-calculator":
      toolContainer.appendChild(createAgeCalculatorTool())
      break
    case "emi-calculator":
      toolContainer.appendChild(createEMICalculatorTool())
      break
    case "sip-calculator":
      toolContainer.appendChild(createSIPCalculatorTool())
      break
    case "qr-generator":
      toolContainer.appendChild(createQRGeneratorTool())
      break
    case "password-generator":
      toolContainer.appendChild(createPasswordGeneratorTool())
      break
    case "word-counter":
      toolContainer.appendChild(createWordCounterTool())
      break
    case "base64":
      toolContainer.appendChild(createBase64Tool())
      break
    case "color-picker":
      toolContainer.appendChild(createColorPickerTool())
      break
    case "text-to-speech":
      toolContainer.appendChild(createTextToSpeechTool())
      break
    case "speech-to-text":
      toolContainer.appendChild(createSpeechToTextTool())
      break
    case "json-formatter":
      toolContainer.appendChild(createJSONFormatterTool())
      break
    case "unit-converter":
      toolContainer.appendChild(createUnitConverterTool())
      break
    case "bmi-calculator":
      toolContainer.appendChild(createBMICalculatorTool())
      break
    case "timer":
      toolContainer.appendChild(createTimerTool())
      break
    default:
      const notFoundMessage = document.createElement("p")
      notFoundMessage.textContent = "Tool not found or under development."
      toolContainer.appendChild(notFoundMessage)
  }

  return toolContainer
}

// ===== TOOL IMPLEMENTATIONS =====

// 1. Image Converter
function createImageConverterTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Convert your images between different formats (JPG, PNG, WebP).</p>
        <div class="file-input-container">
            <p>Drop your image here or click to browse</p>
            <span>Supported formats: JPG, PNG, WebP, GIF</span>
            <input type="file" id="image-input" accept="image/*">
        </div>
        <div class="tool-controls">
            <select id="format-select" class="form-control">
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
            </select>
            <button id="convert-btn" class="btn btn-primary">Convert</button>
            <button id="download-btn" class="btn btn-primary" disabled>Download</button>
        </div>
        <div id="preview-container" style="display: none; margin-top: 20px;">
            <h3>Preview:</h3>
            <img id="preview-image" style="max-width: 100%; border-radius: 5px;">
        </div>
    `

  // Add functionality after the element is added to the DOM
  setTimeout(() => {
    const imageInput = document.getElementById("image-input")
    const formatSelect = document.getElementById("format-select")
    const convertBtn = document.getElementById("convert-btn")
    const downloadBtn = document.getElementById("download-btn")
    const previewContainer = document.getElementById("preview-container")
    const previewImage = document.getElementById("preview-image")

    let originalImage = null
    let convertedImageURL = null

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          originalImage = new Image()
          originalImage.src = event.target.result
          originalImage.onload = () => {
            previewImage.src = originalImage.src
            previewContainer.style.display = "block"
            convertBtn.disabled = false
          }
        }
        reader.readAsDataURL(file)
      }
    })

    convertBtn.addEventListener("click", () => {
      if (!originalImage) {
        showNotification("Please select an image first", "error")
        return
      }

      showNotification("Converting image...", "info")

      // Create canvas to convert the image
      const canvas = document.createElement("canvas")
      canvas.width = originalImage.width
      canvas.height = originalImage.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(originalImage, 0, 0)

      // Convert to selected format
      const format = formatSelect.value
      const quality = format === "image/jpeg" ? 0.92 : 0.8

      try {
        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            // Create URL for the blob
            if (convertedImageURL) {
              URL.revokeObjectURL(convertedImageURL)
            }
            convertedImageURL = URL.createObjectURL(blob)

            // Update preview
            previewImage.src = convertedImageURL
            downloadBtn.disabled = false

            // Setup download button
            downloadBtn.onclick = () => {
              const a = document.createElement("a")
              a.href = convertedImageURL

              // Set filename based on format
              const extension = format.split("/")[1]
              a.download = `converted-image.${extension}`

              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)

              showNotification("Image downloaded successfully!", "success")
            }

            showNotification("Image converted successfully!", "success")
          },
          format,
          quality,
        )
      } catch (error) {
        showNotification("Error converting image", "error")
        console.error(error)
      }
    })
  }, 100)

  return toolSection
}

// 2. Image Compressor
function createImageCompressorTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Compress your images to reduce file size while maintaining quality.</p>
        <div class="file-input-container">
            <p>Drop your image here or click to browse</p>
            <span>Supported formats: JPG, PNG</span>
            <input type="file" id="compress-image-input" accept="image/jpeg, image/png">
        </div>
        <div class="tool-controls">
            <div style="width: 100%;">
                <label for="quality-slider">Quality: <span id="quality-value">80%</span></label>
                <input type="range" id="quality-slider" class="range-slider" min="10" max="100" value="80">
            </div>
            <button id="compress-btn" class="btn btn-primary" disabled>Compress</button>
            <button id="compress-download-btn" class="btn btn-primary" disabled>Download</button>
        </div>
        <div id="compress-info" style="margin-top: 20px; display: none;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <div>Original Size: <span id="original-size">0 KB</span></div>
                <div>Compressed Size: <span id="compressed-size">0 KB</span></div>
                <div>Reduction: <span id="size-reduction">0%</span></div>
            </div>
        </div>
        <div id="compress-preview-container" style="display: none; margin-top: 20px;">
            <h3>Preview:</h3>
            <img id="compress-preview-image" style="max-width: 100%; border-radius: 5px;">
        </div>
    `

  setTimeout(() => {
    const imageInput = document.getElementById("compress-image-input")
    const qualitySlider = document.getElementById("quality-slider")
    const qualityValue = document.getElementById("quality-value")
    const compressBtn = document.getElementById("compress-btn")
    const downloadBtn = document.getElementById("compress-download-btn")
    const previewContainer = document.getElementById("compress-preview-container")
    const previewImage = document.getElementById("compress-preview-image")
    const compressInfo = document.getElementById("compress-info")
    const originalSizeEl = document.getElementById("original-size")
    const compressedSizeEl = document.getElementById("compressed-size")
    const reductionEl = document.getElementById("size-reduction")

    let originalImage = null
    let originalSize = 0
    let compressedImageURL = null

    qualitySlider.addEventListener("input", function () {
      qualityValue.textContent = this.value + "%"
    })

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        originalSize = file.size
        originalSizeEl.textContent = formatBytes(originalSize)

        const reader = new FileReader()
        reader.onload = (event) => {
          originalImage = new Image()
          originalImage.src = event.target.result
          originalImage.onload = () => {
            previewImage.src = originalImage.src
            previewContainer.style.display = "block"
            compressBtn.disabled = false
          }
        }
        reader.readAsDataURL(file)
      }
    })

    compressBtn.addEventListener("click", () => {
      if (!originalImage) {
        showNotification("Please select an image first", "error")
        return
      }

      showNotification("Compressing image...", "info")

      // Create canvas for compression
      const canvas = document.createElement("canvas")
      canvas.width = originalImage.width
      canvas.height = originalImage.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(originalImage, 0, 0)

      // Compress with selected quality
      const quality = qualitySlider.value / 100

      try {
        // Convert to JPEG for better compression
        canvas.toBlob(
          (blob) => {
            // Create URL for the blob
            if (compressedImageURL) {
              URL.revokeObjectURL(compressedImageURL)
            }
            compressedImageURL = URL.createObjectURL(blob)

            // Update preview
            previewImage.src = compressedImageURL
            downloadBtn.disabled = false

            // Update compression info
            const compressedSize = blob.size
            compressedSizeEl.textContent = formatBytes(compressedSize)

            const reduction = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
            reductionEl.textContent = reduction + "%"

            compressInfo.style.display = "block"

            // Setup download button
            downloadBtn.onclick = () => {
              const a = document.createElement("a")
              a.href = compressedImageURL
              a.download = "compressed-image.jpg"
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)

              showNotification("Compressed image downloaded successfully!", "success")
            }

            showNotification("Image compressed successfully!", "success")
          },
          "image/jpeg",
          quality,
        )
      } catch (error) {
        showNotification("Error compressing image", "error")
        console.error(error)
      }
    })

    // Helper function to format bytes
    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes"

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ["Bytes", "KB", "MB", "GB"]

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
  }, 100)

  return toolSection
}

// 3. Image Cropper
function createImageCropperTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Crop your images to the perfect size and shape.</p>
        <div class="file-input-container">
            <p>Drop your image here or click to browse</p>
            <span>Supported formats: JPG, PNG, WebP</span>
            <input type="file" id="crop-image-input" accept="image/*">
        </div>
        <div id="crop-container" style="display: none; margin-top: 20px;">
            <div class="canvas-container">
                <canvas id="crop-canvas" style="max-width: 100%;"></canvas>
            </div>
            <div class="tool-controls" style="margin-top: 15px;">
                <button id="crop-btn" class="btn btn-primary">Crop Selection</button>
                <button id="reset-crop-btn" class="btn btn-primary">Reset</button>
                <button id="crop-download-btn" class="btn btn-primary" disabled>Download</button>
            </div>
        </div>
        <div id="cropped-preview" style="display: none; margin-top: 20px;">
            <h3>Cropped Image:</h3>
            <img id="cropped-image" style="max-width: 100%; border-radius: 5px;">
        </div>
    `

  setTimeout(() => {
    const imageInput = document.getElementById("crop-image-input")
    const cropContainer = document.getElementById("crop-container")
    const canvas = document.getElementById("crop-canvas")
    const ctx = canvas.getContext("2d")
    const cropBtn = document.getElementById("crop-btn")
    const resetBtn = document.getElementById("reset-crop-btn")
    const downloadBtn = document.getElementById("crop-download-btn")
    const croppedPreview = document.getElementById("cropped-preview")
    const croppedImage = document.getElementById("cropped-image")

    let originalImage = null
    let croppedImageURL = null
    let startX, startY, endX, endY
    let isDrawing = false
    let imageLoaded = false

    // Draw image on canvas
    function drawImage() {
      if (!originalImage) return

      // Resize canvas to fit image while maintaining aspect ratio
      const maxWidth = 600
      const maxHeight = 400

      let { width, height } = originalImage

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }

      canvas.width = width
      canvas.height = height

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(originalImage, 0, 0, width, height)
    }

    // Draw selection rectangle
    function drawSelection() {
      if (!imageLoaded) return

      drawImage()

      if (isDrawing || (startX && startY && endX && endY)) {
        ctx.strokeStyle = "#42f8f5"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])

        const x = Math.min(startX, endX)
        const y = Math.min(startY, endY)
        const width = Math.abs(endX - startX)
        const height = Math.abs(endY - startY)

        ctx.strokeRect(x, y, width, height)

        // Add overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.clearRect(x, y, width, height)
        ctx.drawImage(
          originalImage,
          (x / canvas.width) * originalImage.width,
          (y / canvas.height) * originalImage.height,
          (width / canvas.width) * originalImage.width,
          (height / canvas.height) * originalImage.height,
          x,
          y,
          width,
          height,
        )

        ctx.strokeRect(x, y, width, height)
      }
    }

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          originalImage = new Image()
          originalImage.src = event.target.result
          originalImage.onload = () => {
            drawImage()
            cropContainer.style.display = "block"
            imageLoaded = true
          }
        }
        reader.readAsDataURL(file)
      }
    })

    // Mouse events for selection
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect()
      startX = e.clientX - rect.left
      startY = e.clientY - rect.top
      isDrawing = true
    })

    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return

      const rect = canvas.getBoundingClientRect()
      endX = e.clientX - rect.left
      endY = e.clientY - rect.top

      drawSelection()
    })

    canvas.addEventListener("mouseup", () => {
      isDrawing = false
    })

    cropBtn.addEventListener("click", () => {
      if (!startX || !startY || !endX || !endY) {
        showNotification("Please select an area to crop", "error")
        return
      }

      const x = Math.min(startX, endX)
      const y = Math.min(startY, endY)
      const width = Math.abs(endX - startX)
      const height = Math.abs(endY - startY)

      if (width < 10 || height < 10) {
        showNotification("Selection area is too small", "error")
        return
      }

      // Create new canvas for cropped image
      const cropCanvas = document.createElement("canvas")
      const cropCtx = cropCanvas.getContext("2d")

      // Calculate actual crop dimensions
      const scaleX = originalImage.width / canvas.width
      const scaleY = originalImage.height / canvas.height

      const cropX = x * scaleX
      const cropY = y * scaleY
      const cropWidth = width * scaleX
      const cropHeight = height * scaleY

      cropCanvas.width = cropWidth
      cropCanvas.height = cropHeight

      // Draw cropped portion
      cropCtx.drawImage(originalImage, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

      // Convert to blob and create URL
      cropCanvas.toBlob((blob) => {
        if (croppedImageURL) {
          URL.revokeObjectURL(croppedImageURL)
        }
        croppedImageURL = URL.createObjectURL(blob)

        croppedImage.src = croppedImageURL
        croppedPreview.style.display = "block"
        downloadBtn.disabled = false

        // Setup download
        downloadBtn.onclick = () => {
          const a = document.createElement("a")
          a.href = croppedImageURL
          a.download = "cropped-image.png"
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)

          showNotification("Cropped image downloaded successfully!", "success")
        }

        showNotification("Image cropped successfully!", "success")
      }, "image/png")
    })

    resetBtn.addEventListener("click", () => {
      startX = startY = endX = endY = null
      drawImage()
      croppedPreview.style.display = "none"
      downloadBtn.disabled = true
    })
  }, 100)

  return toolSection
}

// 4. Video Converter (Basic functionality)
function createVideoConverterTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Convert video files between different formats. Note: This is a basic implementation for demonstration.</p>
        <div class="file-input-container">
            <p>Drop your video here or click to browse</p>
            <span>Supported formats: MP4, WebM, MOV</span>
            <input type="file" id="video-input" accept="video/*">
        </div>
        <div id="video-preview" style="display: none; margin-top: 20px;">
            <video id="video-element" controls style="width: 100%; max-width: 500px; border-radius: 5px;"></video>
        </div>
        <div class="tool-controls">
            <select id="video-format-select" class="form-control">
                <option value="video/mp4">MP4</option>
                <option value="video/webm">WebM</option>
            </select>
            <button id="video-convert-btn" class="btn btn-primary" disabled>Process Video</button>
        </div>
        <div id="video-info" style="margin-top: 20px; display: none;">
            <p><strong>Note:</strong> Full video conversion requires server-side processing. This demo shows video preview and basic information extraction.</p>
            <div id="video-details"></div>
        </div>
    `

  setTimeout(() => {
    const videoInput = document.getElementById("video-input")
    const videoPreview = document.getElementById("video-preview")
    const videoElement = document.getElementById("video-element")
    const convertBtn = document.getElementById("video-convert-btn")
    const videoInfo = document.getElementById("video-info")
    const videoDetails = document.getElementById("video-details")

    videoInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const url = URL.createObjectURL(file)
        videoElement.src = url
        videoPreview.style.display = "block"
        convertBtn.disabled = false

        // Show video information
        videoElement.addEventListener("loadedmetadata", () => {
          const duration = Math.round(videoElement.duration)
          const size = (file.size / (1024 * 1024)).toFixed(2)

          videoDetails.innerHTML = `
                        <p><strong>Duration:</strong> ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}</p>
                        <p><strong>Size:</strong> ${size} MB</p>
                        <p><strong>Type:</strong> ${file.type}</p>
                    `
          videoInfo.style.display = "block"
        })
      }
    })

    convertBtn.addEventListener("click", () => {
      showNotification("Video processing would require server-side conversion. This is a frontend-only demo.", "info")
    })
  }, 100)

  return toolSection
}

// 5. Audio Converter
function createAudioConverterTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Convert audio files between different formats.</p>
        <div class="file-input-container">
            <p>Drop your audio file here or click to browse</p>
            <span>Supported formats: MP3, WAV, OGG</span>
            <input type="file" id="audio-input" accept="audio/*">
        </div>
        <div id="audio-preview" style="display: none; margin-top: 20px;">
            <audio id="audio-element" controls style="width: 100%;"></audio>
        </div>
        <div class="tool-controls">
            <select id="audio-format-select" class="form-control">
                <option value="audio/wav">WAV</option>
                <option value="audio/mpeg">MP3</option>
                <option value="audio/ogg">OGG</option>
            </select>
            <button id="audio-convert-btn" class="btn btn-primary" disabled>Convert Audio</button>
            <button id="audio-download-btn" class="btn btn-primary" disabled>Download</button>
        </div>
        <div id="audio-info" style="margin-top: 20px; display: none;">
            <div id="audio-details"></div>
        </div>
    `

  setTimeout(() => {
    const audioInput = document.getElementById("audio-input")
    const audioPreview = document.getElementById("audio-preview")
    const audioElement = document.getElementById("audio-element")
    const convertBtn = document.getElementById("audio-convert-btn")
    const downloadBtn = document.getElementById("audio-download-btn")
    const audioInfo = document.getElementById("audio-info")
    const audioDetails = document.getElementById("audio-details")

    let audioContext
    let audioBuffer
    let convertedAudioURL

    audioInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const url = URL.createObjectURL(file)
        audioElement.src = url
        audioPreview.style.display = "block"
        convertBtn.disabled = false

        // Load audio for processing
        const reader = new FileReader()
        reader.onload = (event) => {
          // Initialize audio context
          if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)()
          }

          // Decode audio data
          audioContext
            .decodeAudioData(event.target.result)
            .then((buffer) => {
              audioBuffer = buffer

              const duration = Math.round(buffer.duration)
              const size = (file.size / (1024 * 1024)).toFixed(2)

              audioDetails.innerHTML = `
                                <p><strong>Duration:</strong> ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}</p>
                                <p><strong>Size:</strong> ${size} MB</p>
                                <p><strong>Sample Rate:</strong> ${buffer.sampleRate} Hz</p>
                                <p><strong>Channels:</strong> ${buffer.numberOfChannels}</p>
                            `
              audioInfo.style.display = "block"
            })
            .catch((error) => {
              console.error("Error decoding audio:", error)
              showNotification("Error loading audio file", "error")
            })
        }
        reader.readAsArrayBuffer(file)
      }
    })

    convertBtn.addEventListener("click", () => {
      if (!audioBuffer) {
        showNotification("Please select an audio file first", "error")
        return
      }

      showNotification("Converting audio...", "info")

      try {
        // Create a new buffer for the converted audio
        const offlineContext = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate,
        )

        const source = offlineContext.createBufferSource()
        source.buffer = audioBuffer
        source.connect(offlineContext.destination)
        source.start()

        offlineContext.startRendering().then((renderedBuffer) => {
          // Convert to WAV format (simplified)
          const wav = audioBufferToWav(renderedBuffer)
          const blob = new Blob([wav], { type: "audio/wav" })

          if (convertedAudioURL) {
            URL.revokeObjectURL(convertedAudioURL)
          }
          convertedAudioURL = URL.createObjectURL(blob)

          downloadBtn.disabled = false

          downloadBtn.onclick = () => {
            const a = document.createElement("a")
            a.href = convertedAudioURL
            a.download = "converted-audio.wav"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            showNotification("Audio downloaded successfully!", "success")
          }

          showNotification("Audio converted successfully!", "success")
        })
      } catch (error) {
        showNotification("Error converting audio", "error")
        console.error(error)
      }
    })

    // Helper function to convert AudioBuffer to WAV
    function audioBufferToWav(buffer) {
      const length = buffer.length
      const numberOfChannels = buffer.numberOfChannels
      const sampleRate = buffer.sampleRate
      const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2)
      const view = new DataView(arrayBuffer)

      // WAV header
      const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i))
        }
      }

      writeString(0, "RIFF")
      view.setUint32(4, 36 + length * numberOfChannels * 2, true)
      writeString(8, "WAVE")
      writeString(12, "fmt ")
      view.setUint32(16, 16, true)
      view.setUint16(20, 1, true)
      view.setUint16(22, numberOfChannels, true)
      view.setUint32(24, sampleRate, true)
      view.setUint32(28, sampleRate * numberOfChannels * 2, true)
      view.setUint16(32, numberOfChannels * 2, true)
      view.setUint16(34, 16, true)
      writeString(36, "data")
      view.setUint32(40, length * numberOfChannels * 2, true)

      // Convert float samples to 16-bit PCM
      let offset = 44
      for (let i = 0; i < length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]))
          view.setInt16(offset, sample * 0x7fff, true)
          offset += 2
        }
      }

      return arrayBuffer
    }
  }, 100)

  return toolSection
}

// 6. Audio Trimmer
function createAudioTrimmerTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Trim your audio files to the desired length.</p>
        <div class="file-input-container">
            <p>Drop your audio file here or click to browse</p>
            <span>Supported formats: MP3, WAV, OGG</span>
            <input type="file" id="trim-audio-input" accept="audio/*">
        </div>
        <div id="trim-audio-preview" style="display: none; margin-top: 20px;">
            <audio id="trim-audio-element" controls style="width: 100%;"></audio>
            <div style="margin-top: 15px;">
                <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 10px;">
                    <div>
                        <label>Start Time (seconds):</label>
                        <input type="number" id="start-time" min="0" step="0.1" value="0" style="width: 100px; padding: 5px; margin-left: 10px;">
                    </div>
                    <div>
                        <label>End Time (seconds):</label>
                        <input type="number" id="end-time" min="0" step="0.1" value="10" style="width: 100px; padding: 5px; margin-left: 10px;">
                    </div>
                </div>
                <div class="tool-controls">
                    <button id="trim-audio-btn" class="btn btn-primary">Trim Audio</button>
                    <button id="trim-download-btn" class="btn btn-primary" disabled>Download</button>
                </div>
            </div>
        </div>
        <div id="trimmed-audio-preview" style="display: none; margin-top: 20px;">
            <h3>Trimmed Audio:</h3>
            <audio id="trimmed-audio-element" controls style="width: 100%;"></audio>
        </div>
    `

  setTimeout(() => {
    const audioInput = document.getElementById("trim-audio-input")
    const audioPreview = document.getElementById("trim-audio-preview")
    const audioElement = document.getElementById("trim-audio-element")
    const startTimeInput = document.getElementById("start-time")
    const endTimeInput = document.getElementById("end-time")
    const trimBtn = document.getElementById("trim-audio-btn")
    const downloadBtn = document.getElementById("trim-download-btn")
    const trimmedPreview = document.getElementById("trimmed-audio-preview")
    const trimmedAudioElement = document.getElementById("trimmed-audio-element")

    let audioContext
    let audioBuffer
    let trimmedAudioURL

    audioInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const url = URL.createObjectURL(file)
        audioElement.src = url
        audioPreview.style.display = "block"

        // Load audio for processing
        const reader = new FileReader()
        reader.onload = (event) => {
          if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)()
          }

          audioContext
            .decodeAudioData(event.target.result)
            .then((buffer) => {
              audioBuffer = buffer
              endTimeInput.value = Math.min(10, buffer.duration)
              endTimeInput.max = buffer.duration
              startTimeInput.max = buffer.duration
            })
            .catch((error) => {
              console.error("Error decoding audio:", error)
              showNotification("Error loading audio file", "error")
            })
        }
        reader.readAsArrayBuffer(file)
      }
    })

    trimBtn.addEventListener("click", () => {
      if (!audioBuffer) {
        showNotification("Please select an audio file first", "error")
        return
      }

      const startTime = Number.parseFloat(startTimeInput.value)
      const endTime = Number.parseFloat(endTimeInput.value)

      if (startTime >= endTime) {
        showNotification("End time must be greater than start time", "error")
        return
      }

      if (endTime > audioBuffer.duration) {
        showNotification("End time cannot exceed audio duration", "error")
        return
      }

      showNotification("Trimming audio...", "info")

      try {
        const startSample = Math.floor(startTime * audioBuffer.sampleRate)
        const endSample = Math.floor(endTime * audioBuffer.sampleRate)
        const trimmedLength = endSample - startSample

        // Create new buffer for trimmed audio
        const trimmedBuffer = audioContext.createBuffer(
          audioBuffer.numberOfChannels,
          trimmedLength,
          audioBuffer.sampleRate,
        )

        // Copy the trimmed portion
        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
          const channelData = audioBuffer.getChannelData(channel)
          const trimmedChannelData = trimmedBuffer.getChannelData(channel)

          for (let i = 0; i < trimmedLength; i++) {
            trimmedChannelData[i] = channelData[startSample + i]
          }
        }

        // Convert to WAV
        const wav = audioBufferToWav(trimmedBuffer)
        const blob = new Blob([wav], { type: "audio/wav" })

        if (trimmedAudioURL) {
          URL.revokeObjectURL(trimmedAudioURL)
        }
        trimmedAudioURL = URL.createObjectURL(blob)

        trimmedAudioElement.src = trimmedAudioURL
        trimmedPreview.style.display = "block"
        downloadBtn.disabled = false

        downloadBtn.onclick = () => {
          const a = document.createElement("a")
          a.href = trimmedAudioURL
          a.download = "trimmed-audio.wav"
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)

          showNotification("Trimmed audio downloaded successfully!", "success")
        }

        showNotification("Audio trimmed successfully!", "success")
      } catch (error) {
        showNotification("Error trimming audio", "error")
        console.error(error)
      }
    })

    // Helper function (same as in audio converter)
    function audioBufferToWav(buffer) {
      const length = buffer.length
      const numberOfChannels = buffer.numberOfChannels
      const sampleRate = buffer.sampleRate
      const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2)
      const view = new DataView(arrayBuffer)

      const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i))
        }
      }

      writeString(0, "RIFF")
      view.setUint32(4, 36 + length * numberOfChannels * 2, true)
      writeString(8, "WAVE")
      writeString(12, "fmt ")
      view.setUint32(16, 16, true)
      view.setUint16(20, 1, true)
      view.setUint16(22, numberOfChannels, true)
      view.setUint32(24, sampleRate, true)
      view.setUint32(28, sampleRate * numberOfChannels * 2, true)
      view.setUint16(32, numberOfChannels * 2, true)
      view.setUint16(34, 16, true)
      writeString(36, "data")
      view.setUint32(40, length * numberOfChannels * 2, true)

      let offset = 44
      for (let i = 0; i < length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]))
          view.setInt16(offset, sample * 0x7fff, true)
          offset += 2
        }
      }

      return arrayBuffer
    }
  }, 100)

  return toolSection
}

// 7. Age Calculator
function createAgeCalculatorTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Calculate your exact age in years, months, days, and more.</p>
        <div class="tool-controls">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div>
                    <label for="birth-date">Birth Date:</label>
                    <input type="date" id="birth-date" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
                <div>
                    <label for="target-date">Calculate Age On:</label>
                    <input type="date" id="target-date" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
            </div>
            <button id="calculate-age-btn" class="btn btn-primary">Calculate Age</button>
        </div>
        <div id="age-result" class="tool-result" style="display: none;">
            <h3>Age Calculation Result:</h3>
            <div id="age-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 15px;">
                <!-- Results will be populated here -->
            </div>
        </div>
    `

  setTimeout(() => {
    const birthDateInput = document.getElementById("birth-date")
    const targetDateInput = document.getElementById("target-date")
    const calculateBtn = document.getElementById("calculate-age-btn")
    const ageResult = document.getElementById("age-result")
    const ageDetails = document.getElementById("age-details")

    // Set default target date to today
    const today = new Date()
    targetDateInput.value = today.toISOString().split("T")[0]

    calculateBtn.addEventListener("click", () => {
      const birthDate = new Date(birthDateInput.value)
      const targetDate = new Date(targetDateInput.value)

      if (!birthDateInput.value) {
        showNotification("Please select your birth date", "error")
        return
      }

      if (birthDate > targetDate) {
        showNotification("Birth date cannot be in the future", "error")
        return
      }

      // Calculate age
      const ageData = calculateAge(birthDate, targetDate)

      // Display results
      ageDetails.innerHTML = `
                <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 10px;">Exact Age</h4>
                    <p style="font-size: 1.2em; margin: 5px 0;"><strong>${ageData.years}</strong> years</p>
                    <p style="font-size: 1.1em; margin: 5px 0;"><strong>${ageData.months}</strong> months</p>
                    <p style="font-size: 1.1em; margin: 5px 0;"><strong>${ageData.days}</strong> days</p>
                </div>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 10px;">Total Time Lived</h4>
                    <p><strong>Total Days:</strong> ${ageData.totalDays.toLocaleString()}</p>
                    <p><strong>Total Hours:</strong> ${ageData.totalHours.toLocaleString()}</p>
                    <p><strong>Total Minutes:</strong> ${ageData.totalMinutes.toLocaleString()}</p>
                    <p><strong>Total Seconds:</strong> ${ageData.totalSeconds.toLocaleString()}</p>
                </div>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 10px;">Fun Facts</h4>
                    <p><strong>Day of Week Born:</strong> ${ageData.dayOfWeekBorn}</p>
                    <p><strong>Next Birthday:</strong> ${ageData.nextBirthday}</p>
                    <p><strong>Days Until Birthday:</strong> ${ageData.daysUntilBirthday}</p>
                    <p><strong>Zodiac Sign:</strong> ${ageData.zodiacSign}</p>
                </div>
            `

      ageResult.style.display = "block"
      showNotification("Age calculated successfully!", "success")
    })

    function calculateAge(birthDate, targetDate) {
      const birth = new Date(birthDate)
      const target = new Date(targetDate)

      // Calculate exact age
      let years = target.getFullYear() - birth.getFullYear()
      let months = target.getMonth() - birth.getMonth()
      let days = target.getDate() - birth.getDate()

      if (days < 0) {
        months--
        const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0)
        days += lastMonth.getDate()
      }

      if (months < 0) {
        years--
        months += 12
      }

      // Calculate totals
      const timeDiff = target.getTime() - birth.getTime()
      const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor(timeDiff / (1000 * 60 * 60))
      const totalMinutes = Math.floor(timeDiff / (1000 * 60))
      const totalSeconds = Math.floor(timeDiff / 1000)

      // Day of week born
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const dayOfWeekBorn = daysOfWeek[birth.getDay()]

      // Next birthday
      const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
      if (nextBirthday <= target) {
        nextBirthday.setFullYear(target.getFullYear() + 1)
      }

      const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))

      // Zodiac sign
      const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate())

      return {
        years,
        months,
        days,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        dayOfWeekBorn,
        nextBirthday: nextBirthday.toDateString(),
        daysUntilBirthday,
        zodiacSign,
      }
    }

    function getZodiacSign(month, day) {
      const signs = [
        { sign: "Capricorn", start: [12, 22], end: [1, 19] },
        { sign: "Aquarius", start: [1, 20], end: [2, 18] },
        { sign: "Pisces", start: [2, 19], end: [3, 20] },
        { sign: "Aries", start: [3, 21], end: [4, 19] },
        { sign: "Taurus", start: [4, 20], end: [5, 20] },
        { sign: "Gemini", start: [5, 21], end: [6, 20] },
        { sign: "Cancer", start: [6, 21], end: [7, 22] },
        { sign: "Leo", start: [7, 23], end: [8, 22] },
        { sign: "Virgo", start: [8, 23], end: [9, 22] },
        { sign: "Libra", start: [9, 23], end: [10, 22] },
        { sign: "Scorpio", start: [10, 23], end: [11, 21] },
        { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
      ]

      for (const { sign, start, end } of signs) {
        if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
          return sign
        }
      }

      return "Capricorn" // Default fallback
    }
  }, 100)

  return toolSection
}

// 8. EMI Calculator
function createEMICalculatorTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Calculate your loan EMI, total interest, and payment schedule.</p>
        <div class="tool-controls">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div>
                    <label for="loan-amount">Loan Amount (₹):</label>
                    <input type="number" id="loan-amount" placeholder="e.g., 1000000" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
                <div>
                    <label for="interest-rate">Annual Interest Rate (%):</label>
                    <input type="number" id="interest-rate" step="0.1" placeholder="e.g., 8.5" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
                <div>
                    <label for="loan-tenure">Loan Tenure (Years):</label>
                    <input type="number" id="loan-tenure" placeholder="e.g., 20" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
            </div>
            <button id="calculate-emi-btn" class="btn btn-primary">Calculate EMI</button>
        </div>
        <div id="emi-result" class="tool-result" style="display: none;">
            <h3>EMI Calculation Result:</h3>
            <div id="emi-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                <!-- EMI summary will be populated here -->
            </div>
            <div id="emi-breakdown" style="margin-top: 20px;">
                <h4>Payment Breakdown:</h4>
                <div style="overflow-x: auto;">
                    <table id="emi-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <!-- Payment schedule will be populated here -->
                    </table>
                </div>
            </div>
        </div>
    `

  setTimeout(() => {
    const loanAmountInput = document.getElementById("loan-amount")
    const interestRateInput = document.getElementById("interest-rate")
    const loanTenureInput = document.getElementById("loan-tenure")
    const calculateBtn = document.getElementById("calculate-emi-btn")
    const emiResult = document.getElementById("emi-result")
    const emiSummary = document.getElementById("emi-summary")
    const emiTable = document.getElementById("emi-table")

    calculateBtn.addEventListener("click", () => {
      const loanAmount = Number.parseFloat(loanAmountInput.value)
      const annualRate = Number.parseFloat(interestRateInput.value)
      const tenureYears = Number.parseFloat(loanTenureInput.value)

      if (!loanAmount || !annualRate || !tenureYears) {
        showNotification("Please fill in all fields", "error")
        return
      }

      if (loanAmount <= 0 || annualRate <= 0 || tenureYears <= 0) {
        showNotification("Please enter valid positive values", "error")
        return
      }

      // Calculate EMI
      const monthlyRate = annualRate / (12 * 100)
      const tenureMonths = tenureYears * 12

      const emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1)

      const totalAmount = emi * tenureMonths
      const totalInterest = totalAmount - loanAmount

      // Display summary
      emiSummary.innerHTML = `
                <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 15px;">Monthly EMI</h4>
                    <p style="font-size: 1.8em; font-weight: bold; color: #42f8f5;">₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 15px;">Total Interest</h4>
                    <p style="font-size: 1.5em; font-weight: bold;">₹${totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 15px;">Total Amount</h4>
                    <p style="font-size: 1.5em; font-weight: bold;">₹${totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
            `

      // Generate payment schedule (first 12 months)
      let tableHTML = `
                <thead style="background: rgba(66, 248, 245, 0.1);">
                    <tr>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);">Month</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);">EMI</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);">Principal</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);">Interest</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);">Balance</th>
                    </tr>
                </thead>
                <tbody>
            `

      let balance = loanAmount
      const maxRows = Math.min(12, tenureMonths) // Show first 12 months

      for (let month = 1; month <= maxRows; month++) {
        const interestPayment = balance * monthlyRate
        const principalPayment = emi - interestPayment
        balance -= principalPayment

        tableHTML += `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <td style="padding: 8px; text-align: center;">${month}</td>
                        <td style="padding: 8px; text-align: right;">₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
                        <td style="padding: 8px; text-align: right;">₹${principalPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
                        <td style="padding: 8px; text-align: right;">₹${interestPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
                        <td style="padding: 8px; text-align: right;">₹${balance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
                    </tr>
                `
      }

      if (tenureMonths > 12) {
        tableHTML += `
                    <tr>
                        <td colspan="5" style="padding: 10px; text-align: center; font-style: italic; color: #c5d1de;">
                            ... and ${tenureMonths - 12} more months
                        </td>
                    </tr>
                `
      }

      tableHTML += "</tbody>"
      emiTable.innerHTML = tableHTML

      emiResult.style.display = "block"
      showNotification("EMI calculated successfully!", "success")
    })
  }, 100)

  return toolSection
}

// 9. SIP Calculator
function createSIPCalculatorTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Calculate your SIP returns and plan your investments.</p>
        <div class="tool-controls">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div>
                    <label for="sip-amount">Monthly SIP Amount (₹):</label>
                    <input type="number" id="sip-amount" placeholder="e.g., 5000" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
                <div>
                    <label for="expected-return">Expected Annual Return (%):</label>
                    <input type="number" id="expected-return" step="0.1" placeholder="e.g., 12" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
                <div>
                    <label for="investment-period">Investment Period (Years):</label>
                    <input type="number" id="investment-period" placeholder="e.g., 10" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
            </div>
            <button id="calculate-sip-btn" class="btn btn-primary">Calculate SIP</button>
        </div>
        <div id="sip-result" class="tool-result" style="display: none;">
            <h3>SIP Calculation Result:</h3>
            <div id="sip-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                <!-- SIP summary will be populated here -->
            </div>
            <div id="sip-chart" style="margin-top: 20px;">
                <h4>Investment Growth:</h4>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; margin-top: 10px;">
                    <canvas id="sip-growth-chart" width="400" height="200" style="width: 100%; max-width: 600px;"></canvas>
                </div>
            </div>
        </div>
    `

  setTimeout(() => {
    const sipAmountInput = document.getElementById("sip-amount")
    const expectedReturnInput = document.getElementById("expected-return")
    const investmentPeriodInput = document.getElementById("investment-period")
    const calculateBtn = document.getElementById("calculate-sip-btn")
    const sipResult = document.getElementById("sip-result")
    const sipSummary = document.getElementById("sip-summary")
    const canvas = document.getElementById("sip-growth-chart")
    const ctx = canvas.getContext("2d")

    calculateBtn.addEventListener("click", () => {
      const monthlyAmount = Number.parseFloat(sipAmountInput.value)
      const annualReturn = Number.parseFloat(expectedReturnInput.value)
      const years = Number.parseFloat(investmentPeriodInput.value)

      if (!monthlyAmount || !annualReturn || !years) {
        showNotification("Please fill in all fields", "error")
        return
      }

      if (monthlyAmount <= 0 || annualReturn <= 0 || years <= 0) {
        showNotification("Please enter valid positive values", "error")
        return
      }

      // Calculate SIP returns
      const monthlyReturn = annualReturn / (12 * 100)
      const totalMonths = years * 12

      // Future Value of SIP formula
      const futureValue =
        monthlyAmount * (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn))
      const totalInvestment = monthlyAmount * totalMonths
      const totalReturns = futureValue - totalInvestment

      // Display summary
      sipSummary.innerHTML = `
                <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 15px;">Total Investment</h4>
                    <p style="font-size: 1.5em; font-weight: bold;">₹${totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 15px;">Total Returns</h4>
                    <p style="font-size: 1.5em; font-weight: bold; color: #4eff91;">₹${totalReturns.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #42f8f5; margin-bottom: 15px;">Maturity Value</h4>
                    <p style="font-size: 1.8em; font-weight: bold; color: #42f8f5;">₹${futureValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
            `

      // Draw growth chart
      drawSIPChart(ctx, monthlyAmount, monthlyReturn, totalMonths, canvas.width, canvas.height)

      sipResult.style.display = "block"
      showNotification("SIP calculated successfully!", "success")
    })

    function drawSIPChart(ctx, monthlyAmount, monthlyReturn, totalMonths, width, height) {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Set up chart dimensions
      const padding = 40
      const chartWidth = width - 2 * padding
      const chartHeight = height - 2 * padding

      // Calculate data points
      const dataPoints = []
      let investmentValue = 0
      let currentValue = 0

      for (let month = 0; month <= totalMonths; month += Math.max(1, Math.floor(totalMonths / 20))) {
        investmentValue = monthlyAmount * month

        if (month === 0) {
          currentValue = 0
        } else {
          currentValue =
            monthlyAmount * (((Math.pow(1 + monthlyReturn, month) - 1) / monthlyReturn) * (1 + monthlyReturn))
        }

        dataPoints.push({
          month,
          investment: investmentValue,
          value: currentValue,
        })
      }

      // Find max value for scaling
      const maxValue = Math.max(...dataPoints.map((p) => p.value))

      // Draw axes
      ctx.strokeStyle = "#42f8f5"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, height - padding)
      ctx.lineTo(width - padding, height - padding)
      ctx.stroke()

      // Draw investment line (straight line)
      ctx.strokeStyle = "#c5d1de"
      ctx.lineWidth = 2
      ctx.beginPath()
      dataPoints.forEach((point, index) => {
        const x = padding + (point.month / totalMonths) * chartWidth
        const y = height - padding - (point.investment / maxValue) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw returns line (curved line)
      ctx.strokeStyle = "#42f8f5"
      ctx.lineWidth = 3
      ctx.beginPath()
      dataPoints.forEach((point, index) => {
        const x = padding + (point.month / totalMonths) * chartWidth
        const y = height - padding - (point.value / maxValue) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Add labels
      ctx.fillStyle = "#c5d1de"
      ctx.font = "12px Rajdhani"
      ctx.fillText("Investment", padding + 10, padding + 20)

      ctx.fillStyle = "#42f8f5"
      ctx.fillText("Returns", padding + 10, padding + 40)

      // Add axis labels
      ctx.fillStyle = "#c5d1de"
      ctx.font = "10px Rajdhani"
      ctx.fillText("0", padding - 10, height - padding + 15)
      ctx.fillText(`${totalMonths}m`, width - padding - 10, height - padding + 15)
    }
  }, 100)

  return toolSection
}

// 10. QR Code Generator
function createQRGeneratorTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Generate QR codes for text, URLs, contact information, and more.</p>
        <div class="tool-controls">
            <div style="margin-bottom: 15px;">
                <label for="qr-type">QR Code Type:</label>
                <select id="qr-type" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <option value="text">Text</option>
                    <option value="url">URL</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="wifi">WiFi</option>
                </select>
            </div>
            <div id="qr-input-container">
                <!-- Dynamic input fields will be added here -->
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button id="generate-qr-btn" class="btn btn-primary">Generate QR Code</button>
                <button id="download-qr-btn" class="btn btn-primary" disabled>Download QR</button>
            </div>
        </div>
        <div id="qr-result" style="display: none; margin-top: 20px; text-align: center;">
            <h3>Generated QR Code:</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block; margin-top: 10px;">
                <canvas id="qr-canvas" width="200" height="200"></canvas>
            </div>
        </div>
    `

  setTimeout(() => {
    const qrTypeSelect = document.getElementById("qr-type")
    const qrInputContainer = document.getElementById("qr-input-container")
    const generateBtn = document.getElementById("generate-qr-btn")
    const downloadBtn = document.getElementById("download-qr-btn")
    const qrResult = document.getElementById("qr-result")
    const qrCanvas = document.getElementById("qr-canvas")

    // Update input fields based on QR type
    function updateInputFields() {
      const type = qrTypeSelect.value
      let inputHTML = ""

      switch (type) {
        case "text":
          inputHTML = `
                        <div>
                            <label for="qr-text">Text:</label>
                            <textarea id="qr-text" placeholder="Enter your text here..." style="width: 100%; padding: 10px; margin-top: 5px; min-height: 80px;"></textarea>
                        </div>
                    `
          break
        case "url":
          inputHTML = `
                        <div>
                            <label for="qr-url">URL:</label>
                            <input type="url" id="qr-url" placeholder="https://example.com" style="width: 100%; padding: 10px; margin-top: 5px;">
                        </div>
                    `
          break
        case "email":
          inputHTML = `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label for="qr-email">Email:</label>
                                <input type="email" id="qr-email" placeholder="example@email.com" style="width: 100%; padding: 10px; margin-top: 5px;">
                            </div>
                            <div>
                                <label for="qr-subject">Subject:</label>
                                <input type="text" id="qr-subject" placeholder="Email subject" style="width: 100%; padding: 10px; margin-top: 5px;">
                            </div>
                        </div>
                        <div style="margin-top: 15px;">
                            <label for="qr-body">Message:</label>
                            <textarea id="qr-body" placeholder="Email message..." style="width: 100%; padding: 10px; margin-top: 5px; min-height: 60px;"></textarea>
                        </div>
                    `
          break
        case "phone":
          inputHTML = `
                        <div>
                            <label for="qr-phone">Phone Number:</label>
                            <input type="tel" id="qr-phone" placeholder="+1234567890" style="width: 100%; padding: 10px; margin-top: 5px;">
                        </div>
                    `
          break
        case "wifi":
          inputHTML = `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label for="qr-ssid">Network Name (SSID):</label>
                                <input type="text" id="qr-ssid" placeholder="WiFi Network Name" style="width: 100%; padding: 10px; margin-top: 5px;">
                            </div>
                            <div>
                                <label for="qr-security">Security Type:</label>
                                <select id="qr-security" style="width: 100%; padding: 10px; margin-top: 5px;">
                                    <option value="WPA">WPA/WPA2</option>
                                    <option value="WEP">WEP</option>
                                    <option value="nopass">No Password</option>
                                </select>
                            </div>
                        </div>
                        <div style="margin-top: 15px;">
                            <label for="qr-password">Password:</label>
                            <input type="password" id="qr-password" placeholder="WiFi Password" style="width: 100%; padding: 10px; margin-top: 5px;">
                        </div>
                    `
          break
      }

      qrInputContainer.innerHTML = inputHTML
    }

    // Initialize input fields
    updateInputFields()

    // Update fields when type changes
    qrTypeSelect.addEventListener("change", updateInputFields)

    generateBtn.addEventListener("click", () => {
      const type = qrTypeSelect.value
      let qrData = ""

      // Build QR data based on type
      switch (type) {
        case "text":
          const text = document.getElementById("qr-text").value
          if (!text) {
            showNotification("Please enter some text", "error")
            return
          }
          qrData = text
          break

        case "url":
          const url = document.getElementById("qr-url").value
          if (!url) {
            showNotification("Please enter a URL", "error")
            return
          }
          qrData = url
          break

        case "email":
          const email = document.getElementById("qr-email").value
          const subject = document.getElementById("qr-subject").value || ""
          const body = document.getElementById("qr-body").value || ""

          if (!email) {
            showNotification("Please enter an email address", "error")
            return
          }

          qrData = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
          break

        case "phone":
          const phone = document.getElementById("qr-phone").value
          if (!phone) {
            showNotification("Please enter a phone number", "error")
            return
          }
          qrData = `tel:${phone}`
          break

        case "wifi":
          const ssid = document.getElementById("qr-ssid").value
          const security = document.getElementById("qr-security").value
          const password = document.getElementById("qr-password").value || ""

          if (!ssid) {
            showNotification("Please enter a network name", "error")
            return
          }

          qrData = `WIFI:T:${security};S:${ssid};P:${password};;`
          break
      }

      // Generate QR code
      generateQRCode(qrData)
    })

    function generateQRCode(data) {
      // Simple QR code generation (basic implementation)
      // In a real application, you would use a proper QR code library

      const canvas = qrCanvas
      const ctx = canvas.getContext("2d")
      const size = 200

      // Clear canvas
      ctx.clearRect(0, 0, size, size)

      // Create a simple pattern based on data
      // This is a very basic representation - not a real QR code
      const gridSize = 20
      const cellSize = size / gridSize

      // Generate a pseudo-random pattern based on the data
      const hash = simpleHash(data)

      ctx.fillStyle = "#000000"

      // Draw finder patterns (corners)
      drawFinderPattern(ctx, 0, 0, cellSize)
      drawFinderPattern(ctx, (gridSize - 7) * cellSize, 0, cellSize)
      drawFinderPattern(ctx, 0, (gridSize - 7) * cellSize, cellSize)

      // Draw data pattern
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          // Skip finder pattern areas
          if (isFinderPatternArea(i, j, gridSize)) continue

          // Use hash to determine if cell should be filled
          if ((hash + i * j) % 3 === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
          }
        }
      }

      qrResult.style.display = "block"
      downloadBtn.disabled = false

      // Setup download functionality
      downloadBtn.onclick = () => {
        const link = document.createElement("a")
        link.download = "qrcode.png"
        link.href = canvas.toDataURL()
        link.click()

        showNotification("QR code downloaded successfully!", "success")
      }

      showNotification("QR code generated successfully!", "success")
    }

    function drawFinderPattern(ctx, x, y, cellSize) {
      // Draw the 7x7 finder pattern
      ctx.fillStyle = "#000000"

      // Outer border
      ctx.fillRect(x, y, 7 * cellSize, cellSize)
      ctx.fillRect(x, y, cellSize, 7 * cellSize)
      ctx.fillRect(x, y + 6 * cellSize, 7 * cellSize, cellSize)
      ctx.fillRect(x + 6 * cellSize, y, cellSize, 7 * cellSize)

      // Inner square
      ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize)
    }

    function isFinderPatternArea(i, j, gridSize) {
      // Check if position is in any finder pattern area
      return (i < 9 && j < 9) || (i >= gridSize - 8 && j < 9) || (i < 9 && j >= gridSize - 8)
    }

    function simpleHash(str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32-bit integer
      }
      return Math.abs(hash)
    }
  }, 100)

  return toolSection
}

// 11. Password Generator
function createPasswordGeneratorTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Generate secure, random passwords with customizable options.</p>
        <div class="tool-controls">
            <div style="margin-bottom: 20px;">
                <label for="password-length">Password Length: <span id="length-value">12</span></label>
                <input type="range" id="password-length" class="range-slider" min="4" max="50" value="12">
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="include-uppercase" checked>
                    <span>Uppercase Letters (A-Z)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="include-lowercase" checked>
                    <span>Lowercase Letters (a-z)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="include-numbers" checked>
                    <span>Numbers (0-9)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="include-symbols">
                    <span>Symbols (!@#$%^&*)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="exclude-ambiguous">
                    <span>Exclude Ambiguous (0, O, l, I)</span>
                </label>
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button id="generate-password-btn" class="btn btn-primary">Generate Password</button>
                <button id="generate-multiple-btn" class="btn btn-primary">Generate 5 Passwords</button>
            </div>
        </div>
        
        <div id="password-result" style="display: none;">
            <h3>Generated Password(s):</h3>
            <div id="password-list" style="margin-top: 15px;">
                <!-- Passwords will be displayed here -->
            </div>
        </div>
        
        <div id="password-strength" style="display: none; margin-top: 20px;">
            <h4>Password Strength Analysis:</h4>
            <div id="strength-details" style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; margin-top: 10px;">
                <!-- Strength analysis will be displayed here -->
            </div>
        </div>
    `

  setTimeout(() => {
    const lengthSlider = document.getElementById("password-length")
    const lengthValue = document.getElementById("length-value")
    const uppercaseCheck = document.getElementById("include-uppercase")
    const lowercaseCheck = document.getElementById("include-lowercase")
    const numbersCheck = document.getElementById("include-numbers")
    const symbolsCheck = document.getElementById("include-symbols")
    const excludeAmbiguousCheck = document.getElementById("exclude-ambiguous")
    const generateBtn = document.getElementById("generate-password-btn")
    const generateMultipleBtn = document.getElementById("generate-multiple-btn")
    const passwordResult = document.getElementById("password-result")
    const passwordList = document.getElementById("password-list")
    const passwordStrength = document.getElementById("password-strength")
    const strengthDetails = document.getElementById("strength-details")

    // Update length display
    lengthSlider.addEventListener("input", function () {
      lengthValue.textContent = this.value
    })

    // Character sets
    const charSets = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
      ambiguous: "0Ol1I",
    }

    function generatePassword() {
      const length = Number.parseInt(lengthSlider.value)
      let charset = ""

      // Build character set based on options
      if (uppercaseCheck.checked) charset += charSets.uppercase
      if (lowercaseCheck.checked) charset += charSets.lowercase
      if (numbersCheck.checked) charset += charSets.numbers
      if (symbolsCheck.checked) charset += charSets.symbols

      // Remove ambiguous characters if requested
      if (excludeAmbiguousCheck.checked) {
        for (const char of charSets.ambiguous) {
          charset = charset.replace(new RegExp(char, "g"), "")
        }
      }

      if (charset === "") {
        showNotification("Please select at least one character type", "error")
        return null
      }

      // Generate password
      let password = ""
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length))
      }

      return password
    }

    function analyzePasswordStrength(password) {
      let score = 0
      const feedback = []

      // Length check
      if (password.length >= 12) {
        score += 25
        feedback.push("✓ Good length (12+ characters)")
      } else if (password.length >= 8) {
        score += 15
        feedback.push("⚠ Adequate length (8+ characters)")
      } else {
        feedback.push("✗ Too short (less than 8 characters)")
      }

      // Character variety checks
      if (/[a-z]/.test(password)) {
        score += 15
        feedback.push("✓ Contains lowercase letters")
      }

      if (/[A-Z]/.test(password)) {
        score += 15
        feedback.push("✓ Contains uppercase letters")
      }

      if (/[0-9]/.test(password)) {
        score += 15
        feedback.push("✓ Contains numbers")
      }

      if (/[^a-zA-Z0-9]/.test(password)) {
        score += 20
        feedback.push("✓ Contains special characters")
      }

      // Repetition check
      if (!/(.)\1{2,}/.test(password)) {
        score += 10
        feedback.push("✓ No repeated characters")
      } else {
        feedback.push("⚠ Contains repeated characters")
      }

      // Determine strength level
      let strengthLevel, strengthColor
      if (score >= 80) {
        strengthLevel = "Very Strong"
        strengthColor = "#4eff91"
      } else if (score >= 60) {
        strengthLevel = "Strong"
        strengthColor = "#42f8f5"
      } else if (score >= 40) {
        strengthLevel = "Medium"
        strengthColor = "#ffcc4e"
      } else {
        strengthLevel = "Weak"
        strengthColor = "#ff4e4e"
      }

      return {
        score,
        level: strengthLevel,
        color: strengthColor,
        feedback,
      }
    }

    function displayPasswords(passwords) {
      let html = ""

      passwords.forEach((password, index) => {
        html += `
                    <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <code style="font-family: monospace; font-size: 1.1em; color: #42f8f5; word-break: break-all;">${password}</code>
                            <button onclick="copyToClipboard('${password}')" class="btn btn-primary" style="margin-left: 10px; padding: 5px 10px; font-size: 0.9em;">Copy</button>
                        </div>
                    </div>
                `
      })

      passwordList.innerHTML = html
      passwordResult.style.display = "block"

      // Show strength analysis for single password
      if (passwords.length === 1) {
        const analysis = analyzePasswordStrength(passwords[0])

        strengthDetails.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4>Strength: <span style="color: ${analysis.color};">${analysis.level}</span></h4>
                        <div style="background: rgba(255,255,255,0.1); border-radius: 10px; width: 200px; height: 10px; overflow: hidden;">
                            <div style="background: ${analysis.color}; height: 100%; width: ${analysis.score}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                    <div style="font-size: 0.9em; line-height: 1.6;">
                        ${analysis.feedback.map((item) => `<div>${item}</div>`).join("")}
                    </div>
                `

        passwordStrength.style.display = "block"
      } else {
        passwordStrength.style.display = "none"
      }
    }

    // Make copyToClipboard function global
    window.copyToClipboard = (text) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showNotification("Password copied to clipboard!", "success")
        })
        .catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = text
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          showNotification("Password copied to clipboard!", "success")
        })
    }

    generateBtn.addEventListener("click", () => {
      const password = generatePassword()
      if (password) {
        displayPasswords([password])
        showNotification("Password generated successfully!", "success")
      }
    })

    generateMultipleBtn.addEventListener("click", () => {
      const passwords = []
      for (let i = 0; i < 5; i++) {
        const password = generatePassword()
        if (password) {
          passwords.push(password)
        }
      }

      if (passwords.length > 0) {
        displayPasswords(passwords)
        showNotification(`${passwords.length} passwords generated successfully!`, "success")
      }
    })
  }, 100)

  return toolSection
}

// 12. Word Counter
function createWordCounterTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Count words, characters, paragraphs, and analyze your text.</p>
        <div style="margin-bottom: 20px;">
            <label for="text-input">Enter your text:</label>
            <textarea id="text-input" placeholder="Type or paste your text here..." style="width: 100%; min-height: 200px; padding: 15px; margin-top: 10px; font-family: inherit; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #ffffff; resize: vertical;"></textarea>
        </div>
        
        <div id="text-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                <h4 style="color: #42f8f5; margin-bottom: 10px;">Characters</h4>
                <p id="char-count" style="font-size: 1.5em; font-weight: bold;">0</p>
                <p style="font-size: 0.9em; color: #c5d1de;">with spaces</p>
            </div>
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                <h4 style="color: #42f8f5; margin-bottom: 10px;">Characters</h4>
                <p id="char-count-no-spaces" style="font-size: 1.5em; font-weight: bold;">0</p>
                <p style="font-size: 0.9em; color: #c5d1de;">without spaces</p>
            </div>
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                <h4 style="color: #42f8f5; margin-bottom: 10px;">Words</h4>
                <p id="word-count" style="font-size: 1.5em; font-weight: bold;">0</p>
            </div>
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                <h4 style="color: #42f8f5; margin-bottom: 10px;">Sentences</h4>
                <p id="sentence-count" style="font-size: 1.5em; font-weight: bold;">0</p>
            </div>
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                <h4 style="color: #42f8f5; margin-bottom: 10px;">Paragraphs</h4>
                <p id="paragraph-count" style="font-size: 1.5em; font-weight: bold;">0</p>
            </div>
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                <h4 style="color: #42f8f5; margin-bottom: 10px;">Reading Time</h4>
                <p id="reading-time" style="font-size: 1.5em; font-weight: bold;">0 min</p>
            </div>
        </div>
        
        <div class="tool-controls">
            <button id="clear-text-btn" class="btn btn-primary">Clear Text</button>
            <button id="copy-stats-btn" class="btn btn-primary">Copy Statistics</button>
        </div>
        
        <div id="detailed-analysis" style="margin-top: 20px; display: none;">
            <h3>Detailed Analysis:</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 15px;">
                <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px;">
                    <h4 style="color: #42f8f5; margin-bottom: 10px;">Most Common Words</h4>
                    <div id="common-words" style="font-size: 0.9em;">
                        <!-- Common words will be listed here -->
                    </div>
                </div>
                <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px;">
                    <h4 style="color: #42f8f5; margin-bottom: 10px;">Text Metrics</h4>
                    <div id="text-metrics" style="font-size: 0.9em;">
                        <!-- Text metrics will be listed here -->
                    </div>
                </div>
            </div>
        </div>
    `

  setTimeout(() => {
    const textInput = document.getElementById("text-input")
    const charCount = document.getElementById("char-count")
    const charCountNoSpaces = document.getElementById("char-count-no-spaces")
    const wordCount = document.getElementById("word-count")
    const sentenceCount = document.getElementById("sentence-count")
    const paragraphCount = document.getElementById("paragraph-count")
    const readingTime = document.getElementById("reading-time")
    const clearBtn = document.getElementById("clear-text-btn")
    const copyStatsBtn = document.getElementById("copy-stats-btn")
    const detailedAnalysis = document.getElementById("detailed-analysis")
    const commonWords = document.getElementById("common-words")
    const textMetrics = document.getElementById("text-metrics")

    function updateStats() {
      const text = textInput.value

      // Basic counts
      const chars = text.length
      const charsNoSpaces = text.replace(/\s/g, "").length
      const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
      const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length

      // Reading time (average 200 words per minute)
      const readingTimeMinutes = Math.ceil(words / 200)

      // Update display
      charCount.textContent = chars.toLocaleString()
      charCountNoSpaces.textContent = charsNoSpaces.toLocaleString()
      wordCount.textContent = words.toLocaleString()
      sentenceCount.textContent = sentences.toLocaleString()
      paragraphCount.textContent = paragraphs.toLocaleString()
      readingTime.textContent = readingTimeMinutes + " min"

      // Show detailed analysis if there's text
      if (text.trim().length > 0) {
        updateDetailedAnalysis(text, words, sentences, paragraphs)
        detailedAnalysis.style.display = "block"
      } else {
        detailedAnalysis.style.display = "none"
      }
    }

    function updateDetailedAnalysis(text, wordCount, sentenceCount, paragraphCount) {
      // Most common words
      const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 2) // Filter out short words

      const wordFreq = {}
      words.forEach((word) => {
        wordFreq[word] = (wordFreq[word] || 0) + 1
      })

      const sortedWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

      let commonWordsHTML = ""
      if (sortedWords.length > 0) {
        sortedWords.forEach(([word, count]) => {
          commonWordsHTML += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${word}</span>
                        <span style="color: #42f8f5;">${count}</span>
                    </div>`
        })
      } else {
        commonWordsHTML = '<p style="color: #c5d1de;">No words to analyze</p>'
      }
      commonWords.innerHTML = commonWordsHTML

      // Text metrics
      const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0
      const avgSentencesPerParagraph = paragraphCount > 0 ? (sentenceCount / paragraphCount).toFixed(1) : 0
      const avgWordLength = words.length > 0 ? (words.join("").length / words.length).toFixed(1) : 0

      textMetrics.innerHTML = `
                <div style="margin-bottom: 8px;">
                    <strong>Average words per sentence:</strong> ${avgWordsPerSentence}
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Average sentences per paragraph:</strong> ${avgSentencesPerParagraph}
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Average word length:</strong> ${avgWordLength} characters
                </div>
                <div>
                    <strong>Unique words:</strong> ${Object.keys(wordFreq).length}
                </div>
            `
    }

    // Update stats in real-time
    textInput.addEventListener("input", updateStats)

    // Clear text
    clearBtn.addEventListener("click", () => {
      textInput.value = ""
      updateStats()
      showNotification("Text cleared", "success")
    })

    // Copy statistics
    copyStatsBtn.addEventListener("click", () => {
      const stats = `
Text Statistics:
- Characters (with spaces): ${charCount.textContent}
- Characters (without spaces): ${charCountNoSpaces.textContent}
- Words: ${wordCount.textContent}
- Sentences: ${sentenceCount.textContent}
- Paragraphs: ${paragraphCount.textContent}
- Reading time: ${readingTime.textContent}
            `.trim()

      navigator.clipboard
        .writeText(stats)
        .then(() => {
          showNotification("Statistics copied to clipboard!", "success")
        })
        .catch(() => {
          showNotification("Failed to copy statistics", "error")
        })
    })

    // Initial update
    updateStats()
  }, 100)

  return toolSection
}

// 13. Base64 Encoder/Decoder
function createBase64Tool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Encode or decode text and files to/from Base64 format.</p>
        
        <div style="margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button id="encode-tab" class="btn btn-primary">Encode</button>
                <button id="decode-tab" class="btn btn-primary">Decode</button>
                <button id="file-tab" class="btn btn-primary">File Encode</button>
            </div>
        </div>
        
        <!-- Text Encode Tab -->
        <div id="encode-section" class="tool-section">
            <h4>Text to Base64</h4>
            <div style="margin-bottom: 15px;">
                <label for="text-to-encode">Enter text to encode:</label>
                <textarea id="text-to-encode" placeholder="Enter your text here..." style="width: 100%; min-height: 120px; padding: 10px; margin-top: 5px; font-family: inherit; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #ffffff;"></textarea>
            </div>
            <button id="encode-text-btn" class="btn btn-primary">Encode to Base64</button>
            <div id="encoded-result" style="display: none; margin-top: 15px;">
                <label>Base64 Result:</label>
                <textarea id="encoded-output" readonly style="width: 100%; min-height: 120px; padding: 10px; margin-top: 5px; font-family: monospace; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #42f8f5;"></textarea>
                <button id="copy-encoded-btn" class="btn btn-primary" style="margin-top: 10px;">Copy Result</button>
            </div>
        </div>
        
        <!-- Text Decode Tab -->
        <div id="decode-section" class="tool-section" style="display: none;">
            <h4>Base64 to Text</h4>
            <div style="margin-bottom: 15px;">
                <label for="text-to-decode">Enter Base64 to decode:</label>
                <textarea id="text-to-decode" placeholder="Enter Base64 encoded text here..." style="width: 100%; min-height: 120px; padding: 10px; margin-top: 5px; font-family: monospace; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #ffffff;"></textarea>
            </div>
            <button id="decode-text-btn" class="btn btn-primary">Decode from Base64</button>
            <div id="decoded-result" style="display: none; margin-top: 15px;">
                <label>Decoded Result:</label>
                <textarea id="decoded-output" readonly style="width: 100%; min-height: 120px; padding: 10px; margin-top: 5px; font-family: inherit; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #42f8f5;"></textarea>
                <button id="copy-decoded-btn" class="btn btn-primary" style="margin-top: 10px;">Copy Result</button>
            </div>
        </div>
        
        <!-- File Encode Tab -->
        <div id="file-section" class="tool-section" style="display: none;">
            <h4>File to Base64</h4>
            <div class="file-input-container" style="margin-bottom: 15px;">
                <p>Drop your file here or click to browse</p>
                <span>Any file type supported</span>
                <input type="file" id="file-to-encode">
            </div>
            <div id="file-info" style="display: none; margin-bottom: 15px; padding: 10px; background: rgba(18, 21, 26, 0.8); border-radius: 5px;">
                <!-- File information will be displayed here -->
            </div>
            <button id="encode-file-btn" class="btn btn-primary" disabled>Encode File</button>
            <div id="file-encoded-result" style="display: none; margin-top: 15px;">
                <label>Base64 Result:</label>
                <textarea id="file-encoded-output" readonly style="width: 100%; min-height: 120px; padding: 10px; margin-top: 5px; font-family: monospace; font-size: 0.8em; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #42f8f5;"></textarea>
                <div style="margin-top: 10px; display: flex; gap: 10px;">
                    <button id="copy-file-encoded-btn" class="btn btn-primary">Copy Result</button>
                    <button id="download-base64-btn" class="btn btn-primary">Download as .txt</button>
                </div>
            </div>
        </div>
    `

  setTimeout(() => {
    // Tab elements
    const encodeTab = document.getElementById("encode-tab")
    const decodeTab = document.getElementById("decode-tab")
    const fileTab = document.getElementById("file-tab")

    // Section elements
    const encodeSection = document.getElementById("encode-section")
    const decodeSection = document.getElementById("decode-section")
    const fileSection = document.getElementById("file-section")

    // Text encode elements
    const textToEncode = document.getElementById("text-to-encode")
    const encodeTextBtn = document.getElementById("encode-text-btn")
    const encodedResult = document.getElementById("encoded-result")
    const encodedOutput = document.getElementById("encoded-output")
    const copyEncodedBtn = document.getElementById("copy-encoded-btn")

    // Text decode elements
    const textToDecode = document.getElementById("text-to-decode")
    const decodeTextBtn = document.getElementById("decode-text-btn")
    const decodedResult = document.getElementById("decoded-result")
    const decodedOutput = document.getElementById("decoded-output")
    const copyDecodedBtn = document.getElementById("copy-decoded-btn")

    // File encode elements
    const fileToEncode = document.getElementById("file-to-encode")
    const fileInfo = document.getElementById("file-info")
    const encodeFileBtn = document.getElementById("encode-file-btn")
    const fileEncodedResult = document.getElementById("file-encoded-result")
    const fileEncodedOutput = document.getElementById("file-encoded-output")
    const copyFileEncodedBtn = document.getElementById("copy-file-encoded-btn")
    const downloadBase64Btn = document.getElementById("download-base64-btn")

    let selectedFile = null

    // Tab switching
    function showTab(activeTab) {
      // Reset tab buttons
      ;[encodeTab, decodeTab, fileTab].forEach((tab) => {
        tab.style.background = "var(--bg-button)"
        tab.style.color = "var(--accent-primary)"
      })

      // Hide all sections
      ;[encodeSection, decodeSection, fileSection].forEach((section) => {
        section.style.display = "none"
      })

      // Show active tab and section
      activeTab.style.background = "var(--accent-primary)"
      activeTab.style.color = "var(--bg-main)"

      if (activeTab === encodeTab) {
        encodeSection.style.display = "block"
      } else if (activeTab === decodeTab) {
        decodeSection.style.display = "block"
      } else if (activeTab === fileTab) {
        fileSection.style.display = "block"
      }
    }

    // Initialize with encode tab
    showTab(encodeTab)

    // Tab event listeners
    encodeTab.addEventListener("click", () => showTab(encodeTab))
    decodeTab.addEventListener("click", () => showTab(decodeTab))
    fileTab.addEventListener("click", () => showTab(fileTab))

    // Text encoding
    encodeTextBtn.addEventListener("click", () => {
      const text = textToEncode.value

      if (!text.trim()) {
        showNotification("Please enter some text to encode", "error")
        return
      }

      try {
        const encoded = btoa(unescape(encodeURIComponent(text)))
        encodedOutput.value = encoded
        encodedResult.style.display = "block"
        showNotification("Text encoded successfully!", "success")
      } catch (error) {
        showNotification("Error encoding text", "error")
        console.error(error)
      }
    })

    // Text decoding
    decodeTextBtn.addEventListener("click", () => {
      const base64Text = textToDecode.value.trim()

      if (!base64Text) {
        showNotification("Please enter Base64 text to decode", "error")
        return
      }

      try {
        const decoded = decodeURIComponent(escape(atob(base64Text)))
        decodedOutput.value = decoded
        decodedResult.style.display = "block"
        showNotification("Text decoded successfully!", "success")
      } catch (error) {
        showNotification("Invalid Base64 input", "error")
        console.error(error)
      }
    })

    // File handling
    fileToEncode.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        selectedFile = file

        // Display file information
        const fileSize = (file.size / 1024).toFixed(2)
        fileInfo.innerHTML = `
                    <div><strong>File Name:</strong> ${file.name}</div>
                    <div><strong>File Size:</strong> ${fileSize} KB</div>
                    <div><strong>File Type:</strong> ${file.type || "Unknown"}</div>
                `
        fileInfo.style.display = "block"
        encodeFileBtn.disabled = false
      }
    })

    // File encoding
    encodeFileBtn.addEventListener("click", () => {
      if (!selectedFile) {
        showNotification("Please select a file first", "error")
        return
      }

      showNotification("Encoding file...", "info")

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const base64 = btoa(
            new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), ""),
          )

          fileEncodedOutput.value = base64
          fileEncodedResult.style.display = "block"
          showNotification("File encoded successfully!", "success")
        } catch (error) {
          showNotification("Error encoding file", "error")
          console.error(error)
        }
      }

      reader.onerror = () => {
        showNotification("Error reading file", "error")
      }

      reader.readAsArrayBuffer(selectedFile)
    })

    // Copy functions
    copyEncodedBtn.addEventListener("click", () => {
      copyToClipboard(encodedOutput.value)
    })

    copyDecodedBtn.addEventListener("click", () => {
      copyToClipboard(decodedOutput.value)
    })

    copyFileEncodedBtn.addEventListener("click", () => {
      copyToClipboard(fileEncodedOutput.value)
    })

    // Download Base64 as text file
    downloadBase64Btn.addEventListener("click", () => {
      const base64Content = fileEncodedOutput.value
      if (!base64Content) {
        showNotification("No Base64 content to download", "error")
        return
      }

      const blob = new Blob([base64Content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedFile.name}.base64.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      URL.revokeObjectURL(url)
      showNotification("Base64 file downloaded successfully!", "success")
    })

    // Helper function for copying to clipboard
    function copyToClipboard(text) {
      if (!text) {
        showNotification("Nothing to copy", "error")
        return
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          showNotification("Copied to clipboard!", "success")
        })
        .catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = text
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          showNotification("Copied to clipboard!", "success")
        })
    }
  }, 100)

  return toolSection
}

// 14. Color Picker Tool
function createColorPickerTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Select and convert colors between different formats (HEX, RGB, HSL).</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <!-- Color Picker Section -->
            <div>
                <h4>Color Picker</h4>
                <div style="margin-bottom: 15px;">
                    <input type="color" id="color-picker" value="#42f8f5" style="width: 100%; height: 60px; border: none; border-radius: 5px; cursor: pointer;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label for="color-input">Or enter a color value:</label>
                    <input type="text" id="color-input" placeholder="#42f8f5 or rgb(66, 248, 245)" style="width: 100%; padding: 10px; margin-top: 5px;">
                </div>
                <button id="parse-color-btn" class="btn btn-primary">Parse Color</button>
            </div>
            
            <!-- Color Preview Section -->
            <div>
                <h4>Color Preview</h4>
                <div id="color-preview" style="width: 100%; height: 120px; border-radius: 8px; background-color: #42f8f5; border: 2px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                    Sample Text
                </div>
                <div style="margin-top: 10px; text-align: center;">
                    <button id="random-color-btn" class="btn btn-primary">Random Color</button>
                </div>
            </div>
        </div>
        
        <!-- Color Values Section -->
        <div id="color-values" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px;">
                <h5 style="color: #42f8f5; margin-bottom: 10px;">HEX</h5>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="text" id="hex-value" readonly style="flex: 1; padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; color: #ffffff;">
                    <button onclick="copyColorValue('hex')" class="btn btn-primary" style="padding: 8px 12px; font-size: 0.8em;">Copy</button>
                </div>
            </div>
            
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px;">
                <h5 style="color: #42f8f5; margin-bottom: 10px;">RGB</h5>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="text" id="rgb-value" readonly style="flex: 1; padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; color: #ffffff;">
                    <button onclick="copyColorValue('rgb')" class="btn btn-primary" style="padding: 8px 12px; font-size: 0.8em;">Copy</button>
                </div>
            </div>
            
            <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px;">
                <h5 style="color: #42f8f5; margin-bottom: 10px;">HSL</h5>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="text" id="hsl-value" readonly style="flex: 1; padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; color: #ffffff;">
                    <button onclick="copyColorValue('hsl')" class="btn btn-primary" style="padding: 8px 12px; font-size: 0.8em;">Copy</button>
                </div>
            </div>
        </div>
        
        <!-- Color Palette Section -->
        <div>
            <h4>Color Palette Generator</h4>
            <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                <button id="complementary-btn" class="btn btn-primary">Complementary</button>
                <button id="triadic-btn" class="btn btn-primary">Triadic</button>
                <button id="analogous-btn" class="btn btn-primary">Analogous</button>
                <button id="monochromatic-btn" class="btn btn-primary">Monochromatic</button>
            </div>
            <div id="color-palette" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
                <!-- Palette colors will be displayed here -->
            </div>
        </div>
    `

  setTimeout(() => {
    const colorPicker = document.getElementById("color-picker")
    const colorInput = document.getElementById("color-input")
    const parseColorBtn = document.getElementById("parse-color-btn")
    const colorPreview = document.getElementById("color-preview")
    const randomColorBtn = document.getElementById("random-color-btn")
    const hexValue = document.getElementById("hex-value")
    const rgbValue = document.getElementById("rgb-value")
    const hslValue = document.getElementById("hsl-value")
    const colorPalette = document.getElementById("color-palette")

    // Palette generation buttons
    const complementaryBtn = document.getElementById("complementary-btn")
    const triadicBtn = document.getElementById("triadic-btn")
    const analogousBtn = document.getElementById("analogous-btn")
    const monochromaticBtn = document.getElementById("monochromatic-btn")

    let currentColor = "#42f8f5"

    // Update color display
    function updateColorDisplay(color) {
      currentColor = color

      // Update preview
      colorPreview.style.backgroundColor = color
      colorPicker.value = color

      // Convert to different formats
      const rgb = hexToRgb(color)
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

      // Update value displays
      hexValue.value = color.toUpperCase()
      rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      hslValue.value = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`

      // Update text color for better contrast
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
      colorPreview.style.color = brightness > 128 ? "#000000" : "#ffffff"
    }

    // Color picker change
    colorPicker.addEventListener("change", function () {
      updateColorDisplay(this.value)
    })

    // Parse color input
    parseColorBtn.addEventListener("click", () => {
      const input = colorInput.value.trim()
      if (!input) {
        showNotification("Please enter a color value", "error")
        return
      }

      const parsedColor = parseColorInput(input)
      if (parsedColor) {
        updateColorDisplay(parsedColor)
        showNotification("Color parsed successfully!", "success")
      } else {
        showNotification("Invalid color format", "error")
      }
    })

    // Random color
    randomColorBtn.addEventListener("click", () => {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      updateColorDisplay(randomColor)
      showNotification("Random color generated!", "success")
    })

    // Palette generation
    complementaryBtn.addEventListener("click", () => generatePalette("complementary"))
    triadicBtn.addEventListener("click", () => generatePalette("triadic"))
    analogousBtn.addEventListener("click", () => generatePalette("analogous"))
    monochromaticBtn.addEventListener("click", () => generatePalette("monochromatic"))

    // Generate color palettes
    function generatePalette(type) {
      const baseRgb = hexToRgb(currentColor)
      const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
      let colors = []

      switch (type) {
        case "complementary":
          colors = [currentColor, hslToHex((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l)]
          break

        case "triadic":
          colors = [
            currentColor,
            hslToHex((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l),
            hslToHex((baseHsl.h + 240) % 360, baseHsl.s, baseHsl.l),
          ]
          break

        case "analogous":
          colors = [
            hslToHex((baseHsl.h - 30 + 360) % 360, baseHsl.s, baseHsl.l),
            currentColor,
            hslToHex((baseHsl.h + 30) % 360, baseHsl.s, baseHsl.l),
            hslToHex((baseHsl.h + 60) % 360, baseHsl.s, baseHsl.l),
          ]
          break

        case "monochromatic":
          colors = [
            hslToHex(baseHsl.h, baseHsl.s, Math.max(10, baseHsl.l - 30)),
            hslToHex(baseHsl.h, baseHsl.s, Math.max(10, baseHsl.l - 15)),
            currentColor,
            hslToHex(baseHsl.h, baseHsl.s, Math.min(90, baseHsl.l + 15)),
            hslToHex(baseHsl.h, baseHsl.s, Math.min(90, baseHsl.l + 30)),
          ]
          break
      }

      displayPalette(colors)
      showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} palette generated!`, "success")
    }

    // Display palette
    function displayPalette(colors) {
      let paletteHTML = ""

      colors.forEach((color, index) => {
        const rgb = hexToRgb(color)
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
        const textColor = brightness > 128 ? "#000000" : "#ffffff"

        paletteHTML += `
                    <div style="background-color: ${color}; height: 80px; border-radius: 5px; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; border: 2px solid rgba(255,255,255,0.1);" onclick="selectPaletteColor('${color}')">
                        <span style="color: ${textColor}; font-weight: bold; font-size: 0.8em;">${color.toUpperCase()}</span>
                    </div>
                `
      })

      colorPalette.innerHTML = paletteHTML
    }

    // Make selectPaletteColor global
    window.selectPaletteColor = (color) => {
      updateColorDisplay(color)
      showNotification("Color selected from palette!", "success")
    }

    // Make copyColorValue global
    window.copyColorValue = (format) => {
      let value
      switch (format) {
        case "hex":
          value = hexValue.value
          break
        case "rgb":
          value = rgbValue.value
          break
        case "hsl":
          value = hslValue.value
          break
      }

      navigator.clipboard
        .writeText(value)
        .then(() => {
          showNotification(`${format.toUpperCase()} value copied!`, "success")
        })
        .catch(() => {
          showNotification("Failed to copy color value", "error")
        })
    }

    // Color conversion functions
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : null
    }

    function rgbToHsl(r, g, b) {
      r /= 255
      g /= 255
      b /= 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h,
        s,
        l = (max + min) / 2

      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }

      return {
        h: h * 360,
        s: s * 100,
        l: l * 100,
      }
    }

    function hslToHex(h, s, l) {
      h /= 360
      s /= 100
      l /= 100

      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      let r, g, b

      if (s === 0) {
        r = g = b = l
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
      }

      const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16)
        return hex.length === 1 ? "0" + hex : hex
      }

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    }

    function parseColorInput(input) {
      // Remove whitespace
      input = input.replace(/\s/g, "")

      // HEX format
      if (/^#[0-9A-F]{6}$/i.test(input)) {
        return input
      }

      // RGB format
      const rgbMatch = input.match(/^rgb$$(\d+),(\d+),(\d+)$$$/i)
      if (rgbMatch) {
        const r = Number.parseInt(rgbMatch[1])
        const g = Number.parseInt(rgbMatch[2])
        const b = Number.parseInt(rgbMatch[3])

        if (r <= 255 && g <= 255 && b <= 255) {
          return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
        }
      }

      // HSL format
      const hslMatch = input.match(/^hsl$$(\d+),(\d+)%,(\d+)%$$$/i)
      if (hslMatch) {
        const h = Number.parseInt(hslMatch[1])
        const s = Number.parseInt(hslMatch[2])
        const l = Number.parseInt(hslMatch[3])

        if (h <= 360 && s <= 100 && l <= 100) {
          return hslToHex(h, s, l)
        }
      }

      return null
    }

    // Initialize with default color
    updateColorDisplay(currentColor)
  }, 100)

  return toolSection
}

// 15. Text to Speech
function createTextToSpeechTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Convert written text into natural-sounding speech.</p>
        
        <div style="margin-bottom: 20px;">
            <label for="tts-text">Enter text to convert to speech:</label>
            <textarea id="tts-text" placeholder="Type or paste your text here..." style="width: 100%; min-height: 150px; padding: 15px; margin-top: 10px; font-family: inherit; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #ffffff; resize: vertical;"></textarea>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <div>
                <label for="tts-voice">Voice:</label>
                <select id="tts-voice" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <option value="">Loading voices...</option>
                </select>
            </div>
            <div>
                <label for="tts-rate">Speed: <span id="rate-value">1.0x</span></label>
                <input type="range" id="tts-rate" class="range-slider" min="0.5" max="2" step="0.1" value="1">
            </div>
            <div>
                <label for="tts-pitch">Pitch: <span id="pitch-value">1.0</span></label>
                <input type="range" id="tts-pitch" class="range-slider" min="0.5" max="2" step="0.1" value="1">
            </div>
            <div>
                <label for="tts-volume">Volume: <span id="volume-value">100%</span></label>
                <input type="range" id="tts-volume" class="range-slider" min="0" max="1" step="0.1" value="1">
            </div>
        </div>
        
        <div class="tool-controls">
            <button id="speak-btn" class="btn btn-primary">Speak</button>
            <button id="pause-btn" class="btn btn-primary" disabled>Pause</button>
            <button id="resume-btn" class="btn btn-primary" disabled>Resume</button>
            <button id="stop-btn" class="btn btn-primary" disabled>Stop</button>
        </div>
        
        <div id="tts-status" style="margin-top: 20px; padding: 15px; background: rgba(18, 21, 26, 0.8); border-radius: 8px; display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span id="status-text">Ready</span>
                <div id="progress-bar" style="width: 200px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                    <div id="progress-fill" style="height: 100%; background: #42f8f5; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            </div>
        </div>
        
        <div id="tts-info" style="margin-top: 20px; padding: 15px; background: rgba(18, 21, 26, 0.8); border-radius: 8px;">
            <h4 style="color: #42f8f5; margin-bottom: 10px;">Text Statistics:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                <div>Characters: <span id="tts-char-count">0</span></div>
                <div>Words: <span id="tts-word-count">0</span></div>
                <div>Estimated time: <span id="tts-time-estimate">0s</span></div>
            </div>
        </div>
    `

  setTimeout(() => {
    const ttsText = document.getElementById("tts-text")
    const ttsVoice = document.getElementById("tts-voice")
    const ttsRate = document.getElementById("tts-rate")
    const ttsPitch = document.getElementById("tts-pitch")
    const ttsVolume = document.getElementById("tts-volume")
    const rateValue = document.getElementById("rate-value")
    const pitchValue = document.getElementById("pitch-value")
    const volumeValue = document.getElementById("volume-value")
    const speakBtn = document.getElementById("speak-btn")
    const pauseBtn = document.getElementById("pause-btn")
    const resumeBtn = document.getElementById("resume-btn")
    const stopBtn = document.getElementById("stop-btn")
    const ttsStatus = document.getElementById("tts-status")
    const statusText = document.getElementById("status-text")
    const progressFill = document.getElementById("progress-fill")
    const charCount = document.getElementById("tts-char-count")
    const wordCount = document.getElementById("tts-word-count")
    const timeEstimate = document.getElementById("tts-time-estimate")

    let currentUtterance = null
    let voices = []
    let isPaused = false

    // Check if speech synthesis is supported
    if (!("speechSynthesis" in window)) {
      showNotification("Text-to-speech is not supported in this browser", "error")
      return
    }

    // Load available voices
    function loadVoices() {
      voices = speechSynthesis.getVoices()

      if (voices.length === 0) {
        // Voices might not be loaded yet, try again
        setTimeout(loadVoices, 100)
        return
      }

      ttsVoice.innerHTML = ""

      // Group voices by language
      const voicesByLang = {}
      voices.forEach((voice) => {
        const lang = voice.lang.split("-")[0]
        if (!voicesByLang[lang]) {
          voicesByLang[lang] = []
        }
        voicesByLang[lang].push(voice)
      })

      // Add voices to select
      Object.keys(voicesByLang)
        .sort()
        .forEach((lang) => {
          const optgroup = document.createElement("optgroup")
          optgroup.label = lang.toUpperCase()

          voicesByLang[lang].forEach((voice) => {
            const option = document.createElement("option")
            option.value = voice.name
            option.textContent = `${voice.name} ${voice.default ? "(Default)" : ""}`
            optgroup.appendChild(option)
          })

          ttsVoice.appendChild(optgroup)
        })

      // Select default voice
      const defaultVoice = voices.find((voice) => voice.default) || voices[0]
      if (defaultVoice) {
        ttsVoice.value = defaultVoice.name
      }
    }

    // Load voices when they become available
    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices

    // Update slider values
    ttsRate.addEventListener("input", function () {
      rateValue.textContent = this.value + "x"
    })

    ttsPitch.addEventListener("input", function () {
      pitchValue.textContent = this.value
    })

    ttsVolume.addEventListener("input", function () {
      volumeValue.textContent = Math.round(this.value * 100) + "%"
    })

    // Update text statistics
    function updateStats() {
      const text = ttsText.value
      const chars = text.length
      const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
      const rate = Number.parseFloat(ttsRate.value)
      const estimatedTime = Math.ceil(words / (200 * rate)) // Assuming 200 words per minute base rate

      charCount.textContent = chars
      wordCount.textContent = words
      timeEstimate.textContent = estimatedTime + "s"
    }

    ttsText.addEventListener("input", updateStats)
    ttsRate.addEventListener("input", updateStats)

    // Speech functions
    function speak() {
      const text = ttsText.value.trim()

      if (!text) {
        showNotification("Please enter some text to speak", "error")
        return
      }

      // Stop any current speech
      speechSynthesis.cancel()

      // Create new utterance
      currentUtterance = new SpeechSynthesisUtterance(text)

      // Set voice
      const selectedVoiceName = ttsVoice.value
      const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName)
      if (selectedVoice) {
        currentUtterance.voice = selectedVoice
      }

      // Set parameters
      currentUtterance.rate = Number.parseFloat(ttsRate.value)
      currentUtterance.pitch = Number.parseFloat(ttsPitch.value)
      currentUtterance.volume = Number.parseFloat(ttsVolume.value)

      // Event handlers
      currentUtterance.onstart = () => {
        updateButtonStates("speaking")
        statusText.textContent = "Speaking..."
        ttsStatus.style.display = "block"
        progressFill.style.width = "0%"
      }

      currentUtterance.onend = () => {
        updateButtonStates("ready")
        statusText.textContent = "Finished"
        progressFill.style.width = "100%"
        setTimeout(() => {
          ttsStatus.style.display = "none"
        }, 2000)
      }

      currentUtterance.onerror = (event) => {
        updateButtonStates("ready")
        statusText.textContent = "Error occurred"
        showNotification("Speech synthesis error: " + event.error, "error")
      }

      currentUtterance.onboundary = (event) => {
        // Update progress based on character position
        const progress = (event.charIndex / text.length) * 100
        progressFill.style.width = progress + "%"
      }

      // Start speaking
      speechSynthesis.speak(currentUtterance)
      isPaused = false
    }

    function pauseSpeech() {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause()
        isPaused = true
        updateButtonStates("paused")
        statusText.textContent = "Paused"
      }
    }

    function resumeSpeech() {
      if (speechSynthesis.paused) {
        speechSynthesis.resume()
        isPaused = false
        updateButtonStates("speaking")
        statusText.textContent = "Speaking..."
      }
    }

    function stopSpeech() {
      speechSynthesis.cancel()
      updateButtonStates("ready")
      statusText.textContent = "Stopped"
      progressFill.style.width = "0%"
      setTimeout(() => {
        ttsStatus.style.display = "none"
      }, 1000)
    }

    function updateButtonStates(state) {
      switch (state) {
        case "ready":
          speakBtn.disabled = false
          pauseBtn.disabled = true
          resumeBtn.disabled = true
          stopBtn.disabled = true
          break
        case "speaking":
          speakBtn.disabled = true
          pauseBtn.disabled = false
          resumeBtn.disabled = true
          stopBtn.disabled = false
          break
        case "paused":
          speakBtn.disabled = true
          pauseBtn.disabled = true
          resumeBtn.disabled = false
          stopBtn.disabled = false
          break
      }
    }

    // Event listeners
    speakBtn.addEventListener("click", speak)
    pauseBtn.addEventListener("click", pauseSpeech)
    resumeBtn.addEventListener("click", resumeSpeech)
    stopBtn.addEventListener("click", stopSpeech)

    // Initialize
    updateStats()
    updateButtonStates("ready")
  }, 100)

  return toolSection
}

// 16. Speech to Text
function createSpeechToTextTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Convert spoken words into written text in real-time.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <div>
                <label for="stt-language">Language:</label>
                <select id="stt-language" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="it-IT">Italian</option>
                    <option value="pt-BR">Portuguese (Brazil)</option>
                    <option value="ru-RU">Russian</option>
                    <option value="ja-JP">Japanese</option>
                    <option value="ko-KR">Korean</option>
                    <option value="zh-CN">Chinese (Mandarin)</option>
                    <option value="hi-IN">Hindi</option>
                </select>
            </div>
            <div>
                <label>
                    <input type="checkbox" id="continuous-mode" checked style="margin-right: 8px;">
                    Continuous Recognition
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" id="interim-results" checked style="margin-right: 8px;">
                    Show Interim Results
                </label>
            </div>
        </div>
        
        <div class="tool-controls">
            <button id="start-recording-btn" class="btn btn-primary">🎤 Start Recording</button>
            <button id="stop-recording-btn" class="btn btn-primary" disabled>⏹️ Stop Recording</button>
            <button id="clear-transcript-btn" class="btn btn-primary">🗑️ Clear Text</button>
            <button id="copy-transcript-btn" class="btn btn-primary">📋 Copy Text</button>
        </div>
        
        <div id="recording-status" style="margin-top: 20px; padding: 15px; background: rgba(18, 21, 26, 0.8); border-radius: 8px; display: none;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div id="recording-indicator" style="width: 12px; height: 12px; background: #ff4e4e; border-radius: 50%; animation: pulse 1s infinite;"></div>
                <span id="recording-text">Listening...</span>
            </div>
        </div>
        
        <div style="margin-top: 20px;">
            <label for="transcript-output">Transcript:</label>
            <textarea id="transcript-output" placeholder="Your speech will appear here..." style="width: 100%; min-height: 200px; padding: 15px; margin-top: 10px; font-family: inherit; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #ffffff; resize: vertical;"></textarea>
        </div>
        
        <div id="stt-stats" style="margin-top: 20px; padding: 15px; background: rgba(18, 21, 26, 0.8); border-radius: 8px;">
            <h4 style="color: #42f8f5; margin-bottom: 10px;">Statistics:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                <div>Words: <span id="stt-word-count">0</span></div>
                <div>Characters: <span id="stt-char-count">0</span></div>
                <div>Recording time: <span id="recording-time">0s</span></div>
                <div>Confidence: <span id="confidence-level">-</span></div>
            </div>
        </div>
        
        <style>
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
        </style>
    `

  setTimeout(() => {
    const sttLanguage = document.getElementById("stt-language")
    const continuousMode = document.getElementById("continuous-mode")
    const interimResults = document.getElementById("interim-results")
    const startBtn = document.getElementById("start-recording-btn")
    const stopBtn = document.getElementById("stop-recording-btn")
    const clearBtn = document.getElementById("clear-transcript-btn")
    const copyBtn = document.getElementById("copy-transcript-btn")
    const recordingStatus = document.getElementById("recording-status")
    const recordingText = document.getElementById("recording-text")
    const transcriptOutput = document.getElementById("transcript-output")
    const wordCount = document.getElementById("stt-word-count")
    const charCount = document.getElementById("stt-char-count")
    const recordingTime = document.getElementById("recording-time")
    const confidenceLevel = document.getElementById("confidence-level")

    let recognition = null
    let isRecording = false
    let startTime = null
    let timeInterval = null
    let finalTranscript = ""

    // Check if speech recognition is supported
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      showNotification("Speech recognition is not supported in this browser. Please use Chrome or Edge.", "error")
      startBtn.disabled = true
      return
    }

    // Initialize speech recognition
    function initializeRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognition = new SpeechRecognition()

      recognition.continuous = continuousMode.checked
      recognition.interimResults = interimResults.checked
      recognition.lang = sttLanguage.value

      recognition.onstart = () => {
        isRecording = true
        startTime = Date.now()
        updateButtonStates("recording")
        recordingStatus.style.display = "block"
        recordingText.textContent = "Listening..."

        // Start timer
        timeInterval = setInterval(updateTimer, 1000)

        showNotification("Recording started", "success")
      }

      recognition.onresult = (event) => {
        let interimTranscript = ""
        let confidence = 0

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          confidence = event.results[i][0].confidence

          if (event.results[i].isFinal) {
            finalTranscript += transcript + " "
          } else {
            interimTranscript += transcript
          }
        }

        // Update transcript display
        let displayText = finalTranscript
        if (interimResults.checked && interimTranscript) {
          displayText += interimTranscript
        }

        transcriptOutput.value = displayText

        // Update confidence
        if (confidence > 0) {
          confidenceLevel.textContent = Math.round(confidence * 100) + "%"
        }

        updateStats()
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)

        let errorMessage = "Recognition error: "
        switch (event.error) {
          case "no-speech":
            errorMessage += "No speech detected"
            break
          case "audio-capture":
            errorMessage += "Audio capture failed"
            break
          case "not-allowed":
            errorMessage += "Microphone access denied"
            break
          case "network":
            errorMessage += "Network error"
            break
          default:
            errorMessage += event.error
        }

        showNotification(errorMessage, "error")
        stopRecording()
      }

      recognition.onend = () => {
        if (isRecording && continuousMode.checked) {
          // Restart recognition if continuous mode is enabled
          try {
            recognition.start()
          } catch (e) {
            console.error("Failed to restart recognition:", e)
            stopRecording()
          }
        } else {
          stopRecording()
        }
      }
    }

    function startRecording() {
      if (!recognition) {
        initializeRecognition()
      }

      // Update recognition settings
      recognition.continuous = continuousMode.checked
      recognition.interimResults = interimResults.checked
      recognition.lang = sttLanguage.value

      try {
        recognition.start()
      } catch (e) {
        showNotification("Failed to start recording. Please try again.", "error")
        console.error("Recognition start error:", e)
      }
    }

    function stopRecording() {
      if (recognition && isRecording) {
        recognition.stop()
      }

      isRecording = false
      updateButtonStates("stopped")
      recordingStatus.style.display = "none"

      if (timeInterval) {
        clearInterval(timeInterval)
        timeInterval = null
      }

      showNotification("Recording stopped", "success")
    }

    function updateButtonStates(state) {
      switch (state) {
        case "recording":
          startBtn.disabled = true
          stopBtn.disabled = false
          break
        case "stopped":
          startBtn.disabled = false
          stopBtn.disabled = true
          break
      }
    }

    function updateTimer() {
      if (startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        recordingTime.textContent = elapsed + "s"
      }
    }

    function updateStats() {
      const text = transcriptOutput.value
      const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
      const chars = text.length

      wordCount.textContent = words
      charCount.textContent = chars
    }

    function clearTranscript() {
      transcriptOutput.value = ""
      finalTranscript = ""
      updateStats()
      confidenceLevel.textContent = "-"
      showNotification("Transcript cleared", "success")
    }

    function copyTranscript() {
      const text = transcriptOutput.value
      if (!text.trim()) {
        showNotification("No text to copy", "error")
        return
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          showNotification("Transcript copied to clipboard!", "success")
        })
        .catch(() => {
          // Fallback for older browsers
          transcriptOutput.select()
          document.execCommand("copy")
          showNotification("Transcript copied to clipboard!", "success")
        })
    }

    // Event listeners
    startBtn.addEventListener("click", startRecording)
    stopBtn.addEventListener("click", stopRecording)
    clearBtn.addEventListener("click", clearTranscript)
    copyBtn.addEventListener("click", copyTranscript)

    // Update stats when text is manually edited
    transcriptOutput.addEventListener("input", updateStats)

    // Initialize
    updateButtonStates("stopped")
    updateStats()
  }, 100)

  return toolSection
}

// 17. JSON Formatter
function createJSONFormatterTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Format, validate, and beautify JSON data with syntax highlighting.</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <!-- Input Section -->
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <label for="json-input">JSON Input:</label>
                    <div style="display: flex; gap: 10px;">
                        <button id="paste-json-btn" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8em;">Paste</button>
                        <button id="clear-json-btn" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8em;">Clear</button>
                    </div>
                </div>
                <textarea id="json-input" placeholder='{"name": "John", "age": 30, "city": "New York"}' style="width: 100%; min-height: 300px; padding: 15px; font-family: 'Courier New', monospace; font-size: 0.9em; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #ffffff; resize: vertical;"></textarea>
            </div>
            
            <!-- Output Section -->
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <label for="json-output">Formatted JSON:</label>
                    <div style="display: flex; gap: 10px;">
                        <button id="copy-json-btn" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8em;">Copy</button>
                        <button id="download-json-btn" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8em;">Download</button>
                    </div>
                </div>
                <textarea id="json-output" readonly style="width: 100%; min-height: 300px; padding: 15px; font-family: 'Courier New', monospace; font-size: 0.9em; border: 1px solid rgba(66, 248, 245, 0.2); border-radius: 5px; background: rgba(18, 21, 26, 0.8); color: #42f8f5; resize: vertical;"></textarea>
            </div>
        </div>
        
        <!-- Controls -->
        <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
            <button id="format-json-btn" class="btn btn-primary">Format JSON</button>
            <button id="minify-json-btn" class="btn btn-primary">Minify JSON</button>
            <button id="validate-json-btn" class="btn btn-primary">Validate JSON</button>
            <button id="escape-json-btn" class="btn btn-primary">Escape JSON</button>
            <button id="unescape-json-btn" class="btn btn-primary">Unescape JSON</button>
        </div>
        
        <!-- Indentation Settings -->
        <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 20px;">
            <label>Indentation:</label>
            <label style="display: flex; align-items: center; gap: 5px;">
                <input type="radio" name="indent" value="2" checked>
                <span>2 spaces</span>
            </label>
            <label style="display: flex; align-items: center; gap: 5px;">
                <input type="radio" name="indent" value="4">
                <span>4 spaces</span>
            </label>
            <label style="display: flex; align-items: center; gap: 5px;">
                <input type="radio" name="indent" value="tab">
                <span>Tab</span>
            </label>
        </div>
        
        <!-- Status and Info -->
        <div id="json-status" style="padding: 15px; background: rgba(18, 21, 26, 0.8); border-radius: 8px; margin-bottom: 20px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                <div>
                    <strong>Status:</strong> <span id="validation-status" style="color: #c5d1de;">Ready</span>
                </div>
                <div>
                    <strong>Size:</strong> <span id="json-size">0 bytes</span>
                </div>
                <div>
                    <strong>Lines:</strong> <span id="json-lines">0</span>
                </div>
                <div>
                    <strong>Objects:</strong> <span id="json-objects">0</span>
                </div>
            </div>
        </div>
        
        <!-- Error Display -->
        <div id="json-error" style="display: none; padding: 15px; background: rgba(255, 78, 78, 0.1); border: 1px solid #ff4e4e; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="color: #ff4e4e; margin-bottom: 10px;">JSON Error:</h4>
            <pre id="error-message" style="color: #ff4e4e; font-family: 'Courier New', monospace; white-space: pre-wrap; margin: 0;"></pre>
        </div>
        
        <!-- JSON Tree View -->
        <div id="json-tree-container" style="display: none;">
            <h4 style="color: #42f8f5; margin-bottom: 15px;">JSON Tree View:</h4>
            <div id="json-tree" style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 0.9em; max-height: 400px; overflow-y: auto;">
                <!-- Tree view will be generated here -->
            </div>
        </div>
    `

  setTimeout(() => {
    const jsonInput = document.getElementById("json-input")
    const jsonOutput = document.getElementById("json-output")
    const pasteBtn = document.getElementById("paste-json-btn")
    const clearBtn = document.getElementById("clear-json-btn")
    const copyBtn = document.getElementById("copy-json-btn")
    const downloadBtn = document.getElementById("download-json-btn")
    const formatBtn = document.getElementById("format-json-btn")
    const minifyBtn = document.getElementById("minify-json-btn")
    const validateBtn = document.getElementById("validate-json-btn")
    const escapeBtn = document.getElementById("escape-json-btn")
    const unescapeBtn = document.getElementById("unescape-json-btn")
    const validationStatus = document.getElementById("validation-status")
    const jsonSize = document.getElementById("json-size")
    const jsonLines = document.getElementById("json-lines")
    const jsonObjects = document.getElementById("json-objects")
    const jsonError = document.getElementById("json-error")
    const errorMessage = document.getElementById("error-message")
    const jsonTreeContainer = document.getElementById("json-tree-container")
    const jsonTree = document.getElementById("json-tree")

    let currentJSON = null

    // Get selected indentation
    function getIndentation() {
      const selected = document.querySelector('input[name="indent"]:checked').value
      return selected === "tab" ? "\t" : " ".repeat(Number.parseInt(selected))
    }

    // Update statistics
    function updateStats(text) {
      const size = new Blob([text]).size
      const lines = text.split("\n").length

      jsonSize.textContent = formatBytes(size)
      jsonLines.textContent = lines

      // Count objects and arrays
      try {
        const parsed = JSON.parse(text)
        const objectCount = countObjects(parsed)
        jsonObjects.textContent = objectCount
      } catch (e) {
        jsonObjects.textContent = "0"
      }
    }

    // Count objects in JSON
    function countObjects(obj, count = 0) {
      if (typeof obj === "object" && obj !== null) {
        count++
        if (Array.isArray(obj)) {
          obj.forEach((item) => {
            count = countObjects(item, count)
          })
        } else {
          Object.values(obj).forEach((value) => {
            count = countObjects(value, count)
          })
        }
      }
      return count
    }

    // Format bytes
    function formatBytes(bytes) {
      if (bytes === 0) return "0 bytes"
      const k = 1024
      const sizes = ["bytes", "KB", "MB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    // Validate and parse JSON
    function validateJSON(text) {
      try {
        const parsed = JSON.parse(text)
        currentJSON = parsed

        validationStatus.textContent = "Valid"
        validationStatus.style.color = "#4eff91"
        jsonError.style.display = "none"

        return { valid: true, data: parsed }
      } catch (error) {
        validationStatus.textContent = "Invalid"
        validationStatus.style.color = "#ff4e4e"

        errorMessage.textContent = error.message
        jsonError.style.display = "block"

        return { valid: false, error: error.message }
      }
    }

    // Format JSON
    function formatJSON() {
      const input = jsonInput.value.trim()
      if (!input) {
        showNotification("Please enter JSON to format", "error")
        return
      }

      const result = validateJSON(input)
      if (result.valid) {
        const indent = getIndentation()
        const formatted = JSON.stringify(result.data, null, indent)
        jsonOutput.value = formatted
        updateStats(formatted)
        generateTreeView(result.data)
        showNotification("JSON formatted successfully!", "success")
      }
    }

    // Minify JSON
    function minifyJSON() {
      const input = jsonInput.value.trim()
      if (!input) {
        showNotification("Please enter JSON to minify", "error")
        return
      }

      const result = validateJSON(input)
      if (result.valid) {
        const minified = JSON.stringify(result.data)
        jsonOutput.value = minified
        updateStats(minified)
        generateTreeView(result.data)
        showNotification("JSON minified successfully!", "success")
      }
    }

    // Validate JSON only
    function validateJSONOnly() {
      const input = jsonInput.value.trim()
      if (!input) {
        showNotification("Please enter JSON to validate", "error")
        return
      }

      const result = validateJSON(input)
      if (result.valid) {
        updateStats(input)
        generateTreeView(result.data)
        showNotification("JSON is valid!", "success")
      } else {
        showNotification("JSON is invalid", "error")
      }
    }

    // Escape JSON
    function escapeJSON() {
      const input = jsonInput.value.trim()
      if (!input) {
        showNotification("Please enter JSON to escape", "error")
        return
      }

      const escaped = JSON.stringify(input)
      jsonOutput.value = escaped
      updateStats(escaped)
      jsonTreeContainer.style.display = "none"
      showNotification("JSON escaped successfully!", "success")
    }

    // Unescape JSON
    function unescapeJSON() {
      const input = jsonInput.value.trim()
      if (!input) {
        showNotification("Please enter escaped JSON to unescape", "error")
        return
      }

      try {
        const unescaped = JSON.parse(input)
        if (typeof unescaped === "string") {
          jsonOutput.value = unescaped
          updateStats(unescaped)

          // Try to validate the unescaped content as JSON
          const result = validateJSON(unescaped)
          if (result.valid) {
            generateTreeView(result.data)
          }

          showNotification("JSON unescaped successfully!", "success")
        } else {
          showNotification("Input is not an escaped JSON string", "error")
        }
      } catch (error) {
        showNotification("Invalid escaped JSON", "error")
      }
    }

    // Generate tree view
    function generateTreeView(obj) {
      jsonTree.innerHTML = ""
      const treeHTML = createTreeNode(obj, "", true)
      jsonTree.innerHTML = treeHTML
      jsonTreeContainer.style.display = "block"
    }

    // Create tree node
    function createTreeNode(obj, key = "", isRoot = false) {
      const indent = "  "
      let html = ""

      if (obj === null) {
        html = `<span style="color: #ff4e4e;">null</span>`
      } else if (typeof obj === "boolean") {
        html = `<span style="color: #ffcc4e;">${obj}</span>`
      } else if (typeof obj === "number") {
        html = `<span style="color: #4eff91;">${obj}</span>`
      } else if (typeof obj === "string") {
        html = `<span style="color: #42f8f5;">"${obj}"</span>`
      } else if (Array.isArray(obj)) {
        html = `<span style="color: #c5d1de;">[</span>\n`
        obj.forEach((item, index) => {
          html += `${indent}<span style="color: #c5d1de;">${index}:</span> ${createTreeNode(item)}\n`
        })
        html += `<span style="color: #c5d1de;">]</span>`
      } else if (typeof obj === "object") {
        html = `<span style="color: #c5d1de;">{</span>\n`
        Object.entries(obj).forEach(([k, v]) => {
          html += `${indent}<span style="color: #42f8f5;">"${k}"</span>: ${createTreeNode(v)}\n`
        })
        html += `<span style="color: #c5d1de;">}</span>`
      }

      return html
    }

    // Paste from clipboard
    async function pasteJSON() {
      try {
        const text = await navigator.clipboard.readText()
        jsonInput.value = text
        showNotification("JSON pasted from clipboard!", "success")
      } catch (error) {
        showNotification("Failed to paste from clipboard", "error")
      }
    }

    // Clear input
    function clearJSON() {
      jsonInput.value = ""
      jsonOutput.value = ""
      validationStatus.textContent = "Ready"
      validationStatus.style.color = "#c5d1de"
      jsonError.style.display = "none"
      jsonTreeContainer.style.display = "none"
      updateStats("")
      showNotification("JSON cleared", "success")
    }

    // Copy output
    function copyJSON() {
      const output = jsonOutput.value
      if (!output) {
        showNotification("No formatted JSON to copy", "error")
        return
      }

      navigator.clipboard
        .writeText(output)
        .then(() => {
          showNotification("JSON copied to clipboard!", "success")
        })
        .catch(() => {
          showNotification("Failed to copy JSON", "error")
        })
    }

    // Download JSON
    function downloadJSON() {
      const output = jsonOutput.value
      if (!output) {
        showNotification("No formatted JSON to download", "error")
        return
      }

      const blob = new Blob([output], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "formatted.json"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      URL.revokeObjectURL(url)
      showNotification("JSON downloaded successfully!", "success")
    }

    // Event listeners
    formatBtn.addEventListener("click", formatJSON)
    minifyBtn.addEventListener("click", minifyJSON)
    validateBtn.addEventListener("click", validateJSONOnly)
    escapeBtn.addEventListener("click", escapeJSON)
    unescapeBtn.addEventListener("click", unescapeJSON)
    pasteBtn.addEventListener("click", pasteJSON)
    clearBtn.addEventListener("click", clearJSON)
    copyBtn.addEventListener("click", copyJSON)
    downloadBtn.addEventListener("click", downloadJSON)

    // Auto-validate on input change
    jsonInput.addEventListener("input", function () {
      const text = this.value.trim()
      if (text) {
        updateStats(text)
      } else {
        validationStatus.textContent = "Ready"
        validationStatus.style.color = "#c5d1de"
        jsonError.style.display = "none"
        jsonTreeContainer.style.display = "none"
      }
    })

    // Initialize
    updateStats("")
  }, 100)

  return toolSection
}

// 18. Unit Converter
function createUnitConverterTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Convert between different units of measurement across various categories.</p>
        
        <div style="margin-bottom: 20px;">
            <label for="unit-category">Category:</label>
            <select id="unit-category" style="width: 100%; padding: 10px; margin-top: 5px;">
                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
                <option value="area">Area</option>
                <option value="volume">Volume</option>
                <option value="speed">Speed</option>
                <option value="time">Time</option>
                <option value="energy">Energy</option>
                <option value="power">Power</option>
                <option value="pressure">Pressure</option>
            </select>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 15px; align-items: end; margin-bottom: 20px;">
            <!-- From Unit -->
            <div>
                <label for="from-unit">From:</label>
                <select id="from-unit" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <!-- Options will be populated dynamically -->
                </select>
                <input type="number" id="from-value" placeholder="Enter value" style="width: 100%; padding: 10px; margin-top: 10px;" step="any">
            </div>
            
            <!-- Swap Button -->
            <div style="text-align: center;">
                <button id="swap-units-btn" class="btn btn-primary" style="padding: 10px; border-radius: 50%; width: 50px; height: 50px;">⇄</button>
            </div>
            
            <!-- To Unit -->
            <div>
                <label for="to-unit">To:</label>
                <select id="to-unit" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <!-- Options will be populated dynamically -->
                </select>
                <input type="number" id="to-value" placeholder="Result" readonly style="width: 100%; padding: 10px; margin-top: 10px; background: rgba(18, 21, 26, 0.8); color: #42f8f5;">
            </div>
        </div>
        
        <div class="tool-controls">
            <button id="convert-btn" class="btn btn-primary">Convert</button>
            <button id="clear-conversion-btn" class="btn btn-primary">Clear</button>
            <button id="copy-result-btn" class="btn btn-primary">Copy Result</button>
        </div>
        
        <div id="conversion-history" style="margin-top: 20px; display: none;">
            <h4 style="color: #42f8f5; margin-bottom: 15px;">Conversion History:</h4>
            <div id="history-list" style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; max-height: 200px; overflow-y: auto;">
                <!-- History items will be added here -->
            </div>
            <button id="clear-history-btn" class="btn btn-primary" style="margin-top: 10px; padding: 5px 10px; font-size: 0.8em;">Clear History</button>
        </div>
        
        <div id="unit-info" style="margin-top: 20px; padding: 15px; background: rgba(18, 21, 26, 0.8); border-radius: 8px;">
            <h4 style="color: #42f8f5; margin-bottom: 10px;">Unit Information:</h4>
            <div id="unit-details">
                <p>Select units to see conversion information.</p>
            </div>
        </div>
    `

  setTimeout(() => {
    const unitCategory = document.getElementById("unit-category")
    const fromUnit = document.getElementById("from-unit")
    const toUnit = document.getElementById("to-unit")
    const fromValue = document.getElementById("from-value")
    const toValue = document.getElementById("to-value")
    const swapBtn = document.getElementById("swap-units-btn")
    const convertBtn = document.getElementById("convert-btn")
    const clearBtn = document.getElementById("clear-conversion-btn")
    const copyBtn = document.getElementById("copy-result-btn")
    const conversionHistory = document.getElementById("conversion-history")
    const historyList = document.getElementById("history-list")
    const clearHistoryBtn = document.getElementById("clear-history-btn")
    const unitDetails = document.getElementById("unit-details")

    let history = []

    // Unit definitions
    const units = {
      length: {
        meter: { name: "Meter", symbol: "m", factor: 1 },
        kilometer: { name: "Kilometer", symbol: "km", factor: 1000 },
        centimeter: { name: "Centimeter", symbol: "cm", factor: 0.01 },
        millimeter: { name: "Millimeter", symbol: "mm", factor: 0.001 },
        inch: { name: "Inch", symbol: "in", factor: 0.0254 },
        foot: { name: "Foot", symbol: "ft", factor: 0.3048 },
        yard: { name: "Yard", symbol: "yd", factor: 0.9144 },
        mile: { name: "Mile", symbol: "mi", factor: 1609.344 },
        nauticalMile: { name: "Nautical Mile", symbol: "nmi", factor: 1852 },
      },
      weight: {
        kilogram: { name: "Kilogram", symbol: "kg", factor: 1 },
        gram: { name: "Gram", symbol: "g", factor: 0.001 },
        pound: { name: "Pound", symbol: "lb", factor: 0.453592 },
        ounce: { name: "Ounce", symbol: "oz", factor: 0.0283495 },
        ton: { name: "Metric Ton", symbol: "t", factor: 1000 },
        stone: { name: "Stone", symbol: "st", factor: 6.35029 },
      },
      temperature: {
        celsius: { name: "Celsius", symbol: "°C" },
        fahrenheit: { name: "Fahrenheit", symbol: "°F" },
        kelvin: { name: "Kelvin", symbol: "K" },
      },
      area: {
        squareMeter: { name: "Square Meter", symbol: "m²", factor: 1 },
        squareKilometer: { name: "Square Kilometer", symbol: "km²", factor: 1000000 },
        squareCentimeter: { name: "Square Centimeter", symbol: "cm²", factor: 0.0001 },
        squareInch: { name: "Square Inch", symbol: "in²", factor: 0.00064516 },
        squareFoot: { name: "Square Foot", symbol: "ft²", factor: 0.092903 },
        acre: { name: "Acre", symbol: "ac", factor: 4046.86 },
        hectare: { name: "Hectare", symbol: "ha", factor: 10000 },
      },
      volume: {
        liter: { name: "Liter", symbol: "L", factor: 1 },
        milliliter: { name: "Milliliter", symbol: "mL", factor: 0.001 },
        gallon: { name: "Gallon (US)", symbol: "gal", factor: 3.78541 },
        quart: { name: "Quart (US)", symbol: "qt", factor: 0.946353 },
        pint: { name: "Pint (US)", symbol: "pt", factor: 0.473176 },
        cup: { name: "Cup (US)", symbol: "cup", factor: 0.236588 },
        fluidOunce: { name: "Fluid Ounce (US)", symbol: "fl oz", factor: 0.0295735 },
        cubicMeter: { name: "Cubic Meter", symbol: "m³", factor: 1000 },
      },
      speed: {
        meterPerSecond: { name: "Meter per Second", symbol: "m/s", factor: 1 },
        kilometerPerHour: { name: "Kilometer per Hour", symbol: "km/h", factor: 0.277778 },
        milePerHour: { name: "Mile per Hour", symbol: "mph", factor: 0.44704 },
        knot: { name: "Knot", symbol: "kn", factor: 0.514444 },
        footPerSecond: { name: "Foot per Second", symbol: "ft/s", factor: 0.3048 },
      },
      time: {
        second: { name: "Second", symbol: "s", factor: 1 },
        minute: { name: "Minute", symbol: "min", factor: 60 },
        hour: { name: "Hour", symbol: "h", factor: 3600 },
        day: { name: "Day", symbol: "d", factor: 86400 },
        week: { name: "Week", symbol: "wk", factor: 604800 },
        month: { name: "Month", symbol: "mo", factor: 2629746 },
        year: { name: "Year", symbol: "yr", factor: 31556952 },
      },
      energy: {
        joule: { name: "Joule", symbol: "J", factor: 1 },
        kilojoule: { name: "Kilojoule", symbol: "kJ", factor: 1000 },
        calorie: { name: "Calorie", symbol: "cal", factor: 4.184 },
        kilocalorie: { name: "Kilocalorie", symbol: "kcal", factor: 4184 },
        wattHour: { name: "Watt Hour", symbol: "Wh", factor: 3600 },
        kilowattHour: { name: "Kilowatt Hour", symbol: "kWh", factor: 3600000 },
        btu: { name: "British Thermal Unit", symbol: "BTU", factor: 1055.06 },
      },
      power: {
        watt: { name: "Watt", symbol: "W", factor: 1 },
        kilowatt: { name: "Kilowatt", symbol: "kW", factor: 1000 },
        horsepower: { name: "Horsepower", symbol: "hp", factor: 745.7 },
        btuPerHour: { name: "BTU per Hour", symbol: "BTU/h", factor: 0.293071 },
      },
      pressure: {
        pascal: { name: "Pascal", symbol: "Pa", factor: 1 },
        kilopascal: { name: "Kilopascal", symbol: "kPa", factor: 1000 },
        bar: { name: "Bar", symbol: "bar", factor: 100000 },
        atmosphere: { name: "Atmosphere", symbol: "atm", factor: 101325 },
        psi: { name: "Pounds per Square Inch", symbol: "psi", factor: 6894.76 },
        torr: { name: "Torr", symbol: "Torr", factor: 133.322 },
      },
    }

    // Populate unit dropdowns
    function populateUnits(category) {
      const categoryUnits = units[category]

      fromUnit.innerHTML = ""
      toUnit.innerHTML = ""

      Object.entries(categoryUnits).forEach(([key, unit]) => {
        const option1 = document.createElement("option")
        option1.value = key
        option1.textContent = `${unit.name} (${unit.symbol})`
        fromUnit.appendChild(option1)

        const option2 = document.createElement("option")
        option2.value = key
        option2.textContent = `${unit.name} (${unit.symbol})`
        toUnit.appendChild(option2)
      })

      // Set different default selections
      if (fromUnit.children.length > 1) {
        toUnit.selectedIndex = 1
      }

      updateUnitInfo()
    }

    // Convert temperature
    function convertTemperature(value, from, to) {
      // Convert to Celsius first
      let celsius
      switch (from) {
        case "celsius":
          celsius = value
          break
        case "fahrenheit":
          celsius = ((value - 32) * 5) / 9
          break
        case "kelvin":
          celsius = value - 273.15
          break
      }

      // Convert from Celsius to target
      switch (to) {
        case "celsius":
          return celsius
        case "fahrenheit":
          return (celsius * 9) / 5 + 32
        case "kelvin":
          return celsius + 273.15
      }
    }

    // Convert units
    function convertUnits() {
      const value = Number.parseFloat(fromValue.value)
      const category = unitCategory.value
      const fromUnitKey = fromUnit.value
      const toUnitKey = toUnit.value

      if (isNaN(value)) {
        showNotification("Please enter a valid number", "error")
        return
      }

      let result

      if (category === "temperature") {
        result = convertTemperature(value, fromUnitKey, toUnitKey)
      } else {
        const fromFactor = units[category][fromUnitKey].factor
        const toFactor = units[category][toUnitKey].factor
        result = (value * fromFactor) / toFactor
      }

      toValue.value = result.toFixed(8).replace(/\.?0+$/, "")

      // Add to history
      addToHistory(value, fromUnitKey, result, toUnitKey, category)

      showNotification("Conversion completed!", "success")
    }

    // Add conversion to history
    function addToHistory(fromVal, fromUnit, toVal, toUnit, category) {
      const fromUnitData = units[category][fromUnit]
      const toUnitData = units[category][toUnit]

      const historyItem = {
        from: `${fromVal} ${fromUnitData.symbol}`,
        to: `${toVal} ${toUnitData.symbol}`,
        timestamp: new Date().toLocaleTimeString(),
      }

      history.unshift(historyItem)
      if (history.length > 10) {
        history = history.slice(0, 10)
      }

      updateHistoryDisplay()
    }

    // Update history display
    function updateHistoryDisplay() {
      if (history.length === 0) {
        conversionHistory.style.display = "none"
        return
      }

      conversionHistory.style.display = "block"

      historyList.innerHTML = history
        .map(
          (item) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span>${item.from} → ${item.to}</span>
                    <span style="color: #c5d1de; font-size: 0.8em;">${item.timestamp}</span>
                </div>
            `,
        )
        .join("")
    }

    // Update unit information
    function updateUnitInfo() {
      const category = unitCategory.value
      const fromUnitKey = fromUnit.value
      const toUnitKey = toUnit.value

      if (!fromUnitKey || !toUnitKey) return

      const fromUnitData = units[category][fromUnitKey]
      const toUnitData = units[category][toUnitKey]

      let infoHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="color: #42f8f5; margin-bottom: 8px;">From Unit:</h5>
                        <p><strong>Name:</strong> ${fromUnitData.name}</p>
                        <p><strong>Symbol:</strong> ${fromUnitData.symbol}</p>
            `

      if (fromUnitData.factor) {
        infoHTML += `<p><strong>Base Factor:</strong> ${fromUnitData.factor}</p>`
      }

      infoHTML += `
                    </div>
                    <div>
                        <h5 style="color: #42f8f5; margin-bottom: 8px;">To Unit:</h5>
                        <p><strong>Name:</strong> ${toUnitData.name}</p>
                        <p><strong>Symbol:</strong> ${toUnitData.symbol}</p>
            `

      if (toUnitData.factor) {
        infoHTML += `<p><strong>Base Factor:</strong> ${toUnitData.factor}</p>`
      }

      infoHTML += `
                    </div>
                </div>
            `

      unitDetails.innerHTML = infoHTML
    }

    // Swap units
    function swapUnits() {
      const fromIndex = fromUnit.selectedIndex
      const toIndex = toUnit.selectedIndex
      const fromVal = fromValue.value
      const toVal = toValue.value

      fromUnit.selectedIndex = toIndex
      toUnit.selectedIndex = fromIndex
      fromValue.value = toVal
      toValue.value = fromVal

      updateUnitInfo()
      showNotification("Units swapped!", "success")
    }

    // Clear conversion
    function clearConversion() {
      fromValue.value = ""
      toValue.value = ""
      showNotification("Conversion cleared", "success")
    }

    // Copy result
    function copyResult() {
      const result = toValue.value
      if (!result) {
        showNotification("No result to copy", "error")
        return
      }

      const category = unitCategory.value
      const toUnitKey = toUnit.value
      const toUnitData = units[category][toUnitKey]
      const fullResult = `${result} ${toUnitData.symbol}`

      navigator.clipboard
        .writeText(fullResult)
        .then(() => {
          showNotification("Result copied to clipboard!", "success")
        })
        .catch(() => {
          showNotification("Failed to copy result", "error")
        })
    }

    // Clear history
    function clearHistory() {
      history = []
      updateHistoryDisplay()
      showNotification("History cleared", "success")
    }

    // Event listeners
    unitCategory.addEventListener("change", function () {
      populateUnits(this.value)
    })

    fromUnit.addEventListener("change", updateUnitInfo)
    toUnit.addEventListener("change", updateUnitInfo)

    fromValue.addEventListener("input", function () {
      if (this.value) {
        convertUnits()
      } else {
        toValue.value = ""
      }
    })

    convertBtn.addEventListener("click", convertUnits)
    swapBtn.addEventListener("click", swapUnits)
    clearBtn.addEventListener("click", clearConversion)
    copyBtn.addEventListener("click", copyResult)
    clearHistoryBtn.addEventListener("click", clearHistory)

    // Initialize
    populateUnits("length")
  }, 100)

  return toolSection
}

// 19. BMI Calculator
function createBMICalculatorTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Calculate your Body Mass Index (BMI) and get health recommendations.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px;">
            <!-- Metric System -->
            <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px;">
                <h4 style="color: #42f8f5; margin-bottom: 15px;">Metric System</h4>
                <div style="margin-bottom: 15px;">
                    <label for="height-cm">Height (cm):</label>
                    <input type="number" id="height-cm" placeholder="e.g., 175" style="width: 100%; padding: 10px; margin-top: 5px;" min="50" max="300">
                </div>
                <div style="margin-bottom: 15px;">
                    <label for="weight-kg">Weight (kg):</label>
                    <input type="number" id="weight-kg" placeholder="e.g., 70" style="width: 100%; padding: 10px; margin-top: 5px;" min="20" max="500" step="0.1">
                </div>
                <button id="calculate-metric-btn" class="btn btn-primary" style="width: 100%;">Calculate BMI</button>
            </div>
            
            <!-- Imperial System -->
            <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px;">
                <h4 style="color: #42f8f5; margin-bottom: 15px;">Imperial System</h4>
                <div style="margin-bottom: 15px;">
                    <label>Height:</label>
                    <div style="display: flex; gap: 10px; margin-top: 5px;">
                        <input type="number" id="height-ft" placeholder="Feet" style="flex: 1; padding: 10px;" min="3" max="8">
                        <input type="number" id="height-in" placeholder="Inches" style="flex: 1; padding: 10px;" min="0" max="11">
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <label for="weight-lbs">Weight (lbs):</label>
                    <input type="number" id="weight-lbs" placeholder="e.g., 154" style="width: 100%; padding: 10px; margin-top: 5px;" min="50" max="1000" step="0.1">
                </div>
                <button id="calculate-imperial-btn" class="btn btn-primary" style="width: 100%;">Calculate BMI</button>
            </div>
        </div>
        
        <!-- Additional Information -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <div>
                <label for="age">Age (optional):</label>
                <input type="number" id="age" placeholder="e.g., 25" style="width: 100%; padding: 10px; margin-top: 5px;" min="1" max="120">
            </div>
            <div>
                <label for="gender">Gender (optional):</label>
                <select id="gender" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label for="activity-level">Activity Level (optional):</label>
                <select id="activity-level" style="width: 100%; padding: 10px; margin-top: 5px;">
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="very">Very Active</option>
                    <option value="extra">Extra Active</option>
                </select>
            </div>
        </div>
        
        <!-- Results Section -->
        <div id="bmi-results" style="display: none; margin-top: 20px;">
            <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #42f8f5; margin-bottom: 15px;">BMI Results</h3>
                
                <!-- BMI Value Display -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 3em; font-weight: bold; color: #42f8f5;" id="bmi-value">0.0</div>
                    <div style="font-size: 1.2em; margin-top: 10px;" id="bmi-category">Category</div>
                </div>
                
                <!-- BMI Scale -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #42f8f5; margin-bottom: 10px;">BMI Scale:</h4>
                    <div id="bmi-scale" style="height: 30px; border-radius: 15px; position: relative; background: linear-gradient(to right, #4eff91 0%, #ffcc4e 25%, #ff8c42 50%, #ff4e4e 75%, #8b0000 100%);">
                        <div id="bmi-indicator" style="position: absolute; top: -5px; width: 4px; height: 40px; background: #ffffff; border-radius: 2px; box-shadow: 0 0 5px rgba(0,0,0,0.5); transition: left 0.3s ease;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.8em; color: #c5d1de;">
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                        <span>35</span>
                        <span>40</span>
                    </div>
                </div>
                
                <!-- Category Information -->
                <div id="category-info" style="padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <!-- Category details will be populated here -->
                </div>
                
                <!-- Health Recommendations -->
                <div id="health-recommendations">
                    <h4 style="color: #42f8f5; margin-bottom: 10px;">Health Recommendations:</h4>
                    <div id="recommendations-content">
                        <!-- Recommendations will be populated here -->
                    </div>
                </div>
            </div>
            
            <!-- Additional Calculations -->
            <div id="additional-calculations" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                <!-- Additional health metrics will be displayed here -->
            </div>
        </div>
        
        <!-- BMI Information -->
        <div style="margin-top: 20px; padding: 15px; background: rgba(18, 21, 26, 0.8); border-radius: 8px;">
            <h4 style="color: #42f8f5; margin-bottom: 10px;">About BMI:</h4>
            <p style="color: #c5d1de; line-height: 1.6; margin-bottom: 10px;">
                Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a useful screening tool, but it doesn't directly measure body fat percentage or account for muscle mass, bone density, and other factors.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div>
                    <strong style="color: #4eff91;">Underweight:</strong> BMI less than 18.5
                </div>
                <div>
                    <strong style="color: #42f8f5;">Normal weight:</strong> BMI 18.5-24.9
                </div>
                <div>
                    <strong style="color: #ffcc4e;">Overweight:</strong> BMI 25-29.9
                </div>
                <div>
                    <strong style="color: #ff4e4e;">Obese:</strong> BMI 30 or greater
                </div>
            </div>
        </div>
    `

  setTimeout(() => {
    // Metric inputs
    const heightCm = document.getElementById("height-cm")
    const weightKg = document.getElementById("weight-kg")
    const calculateMetricBtn = document.getElementById("calculate-metric-btn")

    // Imperial inputs
    const heightFt = document.getElementById("height-ft")
    const heightIn = document.getElementById("height-in")
    const weightLbs = document.getElementById("weight-lbs")
    const calculateImperialBtn = document.getElementById("calculate-imperial-btn")

    // Additional inputs
    const age = document.getElementById("age")
    const gender = document.getElementById("gender")
    const activityLevel = document.getElementById("activity-level")

    // Result elements
    const bmiResults = document.getElementById("bmi-results")
    const bmiValue = document.getElementById("bmi-value")
    const bmiCategory = document.getElementById("bmi-category")
    const bmiIndicator = document.getElementById("bmi-indicator")
    const categoryInfo = document.getElementById("category-info")
    const recommendationsContent = document.getElementById("recommendations-content")
    const additionalCalculations = document.getElementById("additional-calculations")

    // BMI categories
    const bmiCategories = {
      underweight: {
        name: "Underweight",
        range: "BMI less than 18.5",
        color: "#4eff91",
        description:
          "You may be underweight. Consider consulting with a healthcare provider about healthy weight gain strategies.",
        risks: ["Nutritional deficiencies", "Weakened immune system", "Osteoporosis risk"],
        recommendations: [
          "Eat nutrient-dense, calorie-rich foods",
          "Include healthy fats in your diet",
          "Consider strength training to build muscle mass",
          "Consult with a nutritionist or healthcare provider",
        ],
      },
      normal: {
        name: "Normal Weight",
        range: "BMI 18.5-24.9",
        color: "#42f8f5",
        description:
          "You have a healthy weight for your height. Maintain your current lifestyle with regular exercise and balanced nutrition.",
        risks: [],
        recommendations: [
          "Maintain a balanced, nutritious diet",
          "Engage in regular physical activity",
          "Get adequate sleep (7-9 hours per night)",
          "Stay hydrated and manage stress",
        ],
      },
      overweight: {
        name: "Overweight",
        range: "BMI 25-29.9",
        color: "#ffcc4e",
        description: "You may be overweight. Small lifestyle changes can help you reach a healthier weight.",
        risks: ["Increased risk of heart disease", "Type 2 diabetes risk", "High blood pressure"],
        recommendations: [
          "Create a moderate calorie deficit through diet and exercise",
          "Focus on whole foods and reduce processed foods",
          "Increase physical activity gradually",
          "Consider consulting with a healthcare provider",
        ],
      },
      obese: {
        name: "Obese",
        range: "BMI 30 or greater",
        color: "#ff4e4e",
        description:
          "You may be in the obese category. Consider working with healthcare professionals for a comprehensive weight management plan.",
        risks: ["Heart disease", "Type 2 diabetes", "Sleep apnea", "Certain cancers"],
        recommendations: [
          "Consult with healthcare professionals",
          "Consider a structured weight loss program",
          "Focus on sustainable lifestyle changes",
          "Regular monitoring of health markers",
        ],
      },
    }

    // Calculate BMI
    function calculateBMI(heightM, weightKg) {
      return weightKg / (heightM * heightM)
    }

    // Get BMI category
    function getBMICategory(bmi) {
      if (bmi < 18.5) return "underweight"
      if (bmi < 25) return "normal"
      if (bmi < 30) return "overweight"
      return "obese"
    }

    // Update BMI indicator position
    function updateBMIIndicator(bmi) {
      // BMI scale: 15 to 45
      const minBMI = 15
      const maxBMI = 45
      const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi))
      const percentage = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100
      bmiIndicator.style.left = `calc(${percentage}% - 2px)`
    }

    // Calculate additional metrics
    function calculateAdditionalMetrics(heightM, weightKg, ageValue, genderValue, activityValue) {
      const metrics = {}

      // Ideal weight range (using BMI 18.5-24.9)
      const minIdealWeight = 18.5 * heightM * heightM
      const maxIdealWeight = 24.9 * heightM * heightM
      metrics.idealWeightRange = `${minIdealWeight.toFixed(1)} - ${maxIdealWeight.toFixed(1)} kg`

      // Weight to lose/gain to reach normal BMI
      const currentBMI = calculateBMI(heightM, weightKg)
      if (currentBMI < 18.5) {
        const weightToGain = minIdealWeight - weightKg
        metrics.weightChange = `Gain ${weightToGain.toFixed(1)} kg to reach normal BMI`
      } else if (currentBMI > 24.9) {
        const weightToLose = weightKg - maxIdealWeight
        metrics.weightChange = `Lose ${weightToLose.toFixed(1)} kg to reach normal BMI`
      } else {
        metrics.weightChange = "You are in the healthy weight range"
      }

      // BMR (Basal Metabolic Rate) if age and gender are provided
      if (ageValue && genderValue) {
        let bmr
        if (genderValue === "male") {
          bmr = 88.362 + 13.397 * weightKg + 4.799 * heightM * 100 - 5.677 * ageValue
        } else {
          bmr = 447.593 + 9.247 * weightKg + 3.098 * heightM * 100 - 4.33 * ageValue
        }
        metrics.bmr = `${Math.round(bmr)} calories/day`

        // TDEE (Total Daily Energy Expenditure) if activity level is provided
        if (activityValue) {
          const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            very: 1.725,
            extra: 1.9,
          }
          const tdee = bmr * activityMultipliers[activityValue]
          metrics.tdee = `${Math.round(tdee)} calories/day`
        }
      }

      return metrics
    }

    // Display results
    function displayResults(heightM, weightKg) {
      const bmi = calculateBMI(heightM, weightKg)
      const category = getBMICategory(bmi)
      const categoryData = bmiCategories[category]

      // Display BMI value
      bmiValue.textContent = bmi.toFixed(1)
      bmiCategory.textContent = categoryData.name
      bmiCategory.style.color = categoryData.color

      // Update indicator
      updateBMIIndicator(bmi)

      // Display category information
      categoryInfo.style.background = `rgba(${hexToRgb(categoryData.color).r}, ${hexToRgb(categoryData.color).g}, ${hexToRgb(categoryData.color).b}, 0.1)`
      categoryInfo.style.border = `1px solid ${categoryData.color}`

      let categoryHTML = `
                <h5 style="color: ${categoryData.color}; margin-bottom: 10px;">${categoryData.name} (${categoryData.range})</h5>
                <p style="margin-bottom: 15px;">${categoryData.description}</p>
            `

      if (categoryData.risks.length > 0) {
        categoryHTML += `
                    <div style="margin-bottom: 15px;">
                        <strong>Potential Health Risks:</strong>
                        <ul style="margin: 5px 0 0 20px;">
                            ${categoryData.risks.map((risk) => `<li>${risk}</li>`).join("")}
                        </ul>
                    </div>
                `
      }

      categoryInfo.innerHTML = categoryHTML

      // Display recommendations
      recommendationsContent.innerHTML = `
                <ul style="margin: 0 0 0 20px;">
                    ${categoryData.recommendations.map((rec) => `<li style="margin-bottom: 5px;">${rec}</li>`).join("")}
                </ul>
            `

      // Calculate and display additional metrics
      const ageValue = Number.parseInt(age.value)
      const genderValue = gender.value
      const activityValue = activityLevel.value

      const additionalMetrics = calculateAdditionalMetrics(heightM, weightKg, ageValue, genderValue, activityValue)

      let additionalHTML = ""
      Object.entries(additionalMetrics).forEach(([key, value]) => {
        let title
        switch (key) {
          case "idealWeightRange":
            title = "Ideal Weight Range"
            break
          case "weightChange":
            title = "Weight Recommendation"
            break
          case "bmr":
            title = "Basal Metabolic Rate"
            break
          case "tdee":
            title = "Total Daily Energy Expenditure"
            break
          default:
            title = key
        }

        additionalHTML += `
                    <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px; text-align: center;">
                        <h5 style="color: #42f8f5; margin-bottom: 10px;">${title}</h5>
                        <p style="font-size: 1.1em; font-weight: bold;">${value}</p>
                    </div>
                `
      })

      additionalCalculations.innerHTML = additionalHTML

      // Show results
      bmiResults.style.display = "block"

      showNotification("BMI calculated successfully!", "success")
    }

    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : null
    }

    // Calculate BMI with metric system
    calculateMetricBtn.addEventListener("click", () => {
      const height = Number.parseFloat(heightCm.value)
      const weight = Number.parseFloat(weightKg.value)

      if (!height || !weight) {
        showNotification("Please enter both height and weight", "error")
        return
      }

      if (height < 50 || height > 300) {
        showNotification("Please enter a valid height (50-300 cm)", "error")
        return
      }

      if (weight < 20 || weight > 500) {
        showNotification("Please enter a valid weight (20-500 kg)", "error")
        return
      }

      const heightM = height / 100 // Convert cm to meters
      displayResults(heightM, weight)
    })

    // Calculate BMI with imperial system
    calculateImperialBtn.addEventListener("click", () => {
      const feet = Number.parseFloat(heightFt.value)
      const inches = Number.parseFloat(heightIn.value) || 0
      const weight = Number.parseFloat(weightLbs.value)

      if (!feet || !weight) {
        showNotification("Please enter height (feet) and weight", "error")
        return
      }

      if (feet < 3 || feet > 8 || inches < 0 || inches >= 12) {
        showNotification("Please enter a valid height", "error")
        return
      }

      if (weight < 50 || weight > 1000) {
        showNotification("Please enter a valid weight (50-1000 lbs)", "error")
        return
      }

      // Convert to metric
      const totalInches = feet * 12 + inches
      const heightM = totalInches * 0.0254 // Convert inches to meters
      const weightKg = weight * 0.453592 // Convert lbs to kg

      displayResults(heightM, weightKg)
    })

    // Auto-calculate when values change (for better UX)
    function autoCalculate() {
      // Try metric first
      const heightCmVal = Number.parseFloat(heightCm.value)
      const weightKgVal = Number.parseFloat(weightKg.value)

      if (
        heightCmVal &&
        weightKgVal &&
        heightCmVal >= 50 &&
        heightCmVal <= 300 &&
        weightKgVal >= 20 &&
        weightKgVal <= 500
      ) {
        const heightM = heightCmVal / 100
        displayResults(heightM, weightKgVal)
        return
      }

      // Try imperial
      const feet = Number.parseFloat(heightFt.value)
      const inches = Number.parseFloat(heightIn.value) || 0
      const weightLbsVal = Number.parseFloat(weightLbs.value)

      if (
        feet &&
        weightLbsVal &&
        feet >= 3 &&
        feet <= 8 &&
        inches >= 0 &&
        inches < 12 &&
        weightLbsVal >= 50 &&
        weightLbsVal <= 1000
      ) {
        const totalInches = feet * 12 + inches
        const heightM = totalInches * 0.0254
        const weightKg = weightLbsVal * 0.453592
        displayResults(heightM, weightKg)
      }
    }

    // Add auto-calculation on input change (with debounce)
    let autoCalcTimeout
    ;[heightCm, weightKg, heightFt, heightIn, weightLbs].forEach((input) => {
      input.addEventListener("input", () => {
        clearTimeout(autoCalcTimeout)
        autoCalcTimeout = setTimeout(autoCalculate, 500)
      })
    })
  }, 100)

  return toolSection
}

// 20. Timer/Stopwatch
function createTimerTool() {
  const toolSection = document.createElement("div")
  toolSection.className = "tool-section"

  toolSection.innerHTML = `
        <p>Set timers or use a precise stopwatch with lap functionality.</p>
        
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button id="timer-tab" class="btn btn-primary">Timer</button>
            <button id="stopwatch-tab" class="btn btn-primary">Stopwatch</button>
        </div>
        
        <!-- Timer Section -->
        <div id="timer-section">
            <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #42f8f5; margin-bottom: 15px;">Set Timer</h4>
                
                <!-- Time Input -->
                <div style="display: flex; gap: 15px; align-items: end; margin-bottom: 20px; justify-content: center;">
                    <div style="text-align: center;">
                        <label for="timer-hours">Hours</label>
                        <input type="number" id="timer-hours" min="0" max="23" value="0" style="width: 80px; padding: 10px; margin-top: 5px; text-align: center; font-size: 1.2em;">
                    </div>
                    <div style="text-align: center;">
                        <label for="timer-minutes">Minutes</label>
                        <input type="number" id="timer-minutes" min="0" max="59" value="5" style="width: 80px; padding: 10px; margin-top: 5px; text-align: center; font-size: 1.2em;">
                    </div>
                    <div style="text-align: center;">
                        <label for="timer-seconds">Seconds</label>
                        <input type="number" id="timer-seconds" min="0" max="59" value="0" style="width: 80px; padding: 10px; margin-top: 5px; text-align: center; font-size: 1.2em;">
                    </div>
                </div>
                
                <!-- Quick Timer Buttons -->
                <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; justify-content: center;">
                    <button class="quick-timer-btn btn btn-primary" data-time="60" style="padding: 8px 12px; font-size: 0.9em;">1 min</button>
                    <button class="quick-timer-btn btn btn-primary" data-time="300" style="padding: 8px 12px; font-size: 0.9em;">5 min</button>
                    <button class="quick-timer-btn btn btn-primary" data-time="600" style="padding: 8px 12px; font-size: 0.9em;">10 min</button>
                    <button class="quick-timer-btn btn btn-primary" data-time="900" style="padding: 8px 12px; font-size: 0.9em;">15 min</button>
                    <button class="quick-timer-btn btn btn-primary" data-time="1800" style="padding: 8px 12px; font-size: 0.9em;">30 min</button>
                    <button class="quick-timer-btn btn btn-primary" data-time="3600" style="padding: 8px 12px; font-size: 0.9em;">1 hour</button>
                </div>
                
                <!-- Timer Display -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <div id="timer-display" style="font-size: 4em; font-weight: bold; color: #42f8f5; font-family: 'Courier New', monospace;">00:05:00</div>
                    <div id="timer-status" style="font-size: 1.2em; color: #c5d1de; margin-top: 10px;">Ready</div>
                </div>
                
                <!-- Timer Progress -->
                <div id="timer-progress-container" style="margin-bottom: 20px; display: none;">
                    <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div id="timer-progress" style="height: 100%; background: #42f8f5; width: 100%; transition: width 1s linear;"></div>
                    </div>
                </div>
                
                <!-- Timer Controls -->
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button id="start-timer-btn" class="btn btn-primary">▶️ Start</button>
                    <button id="pause-timer-btn" class="btn btn-primary" disabled>⏸️ Pause</button>
                    <button id="reset-timer-btn" class="btn btn-primary">🔄 Reset</button>
                </div>
            </div>
        </div>
        
        <!-- Stopwatch Section -->
        <div id="stopwatch-section" style="display: none;">
            <div style="background: rgba(18, 21, 26, 0.8); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #42f8f5; margin-bottom: 15px;">Stopwatch</h4>
                
                <!-- Stopwatch Display -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <div id="stopwatch-display" style="font-size: 4em; font-weight: bold; color: #42f8f5; font-family: 'Courier New', monospace;">00:00:00</div>
                    <div id="stopwatch-milliseconds" style="font-size: 1.5em; color: #c5d1de; font-family: 'Courier New', monospace;">.000</div>
                </div>
                
                <!-- Stopwatch Controls -->
                <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
                    <button id="start-stopwatch-btn" class="btn btn-primary">▶️ Start</button>
                    <button id="lap-btn" class="btn btn-primary" disabled>🏁 Lap</button>
                    <button id="stop-stopwatch-btn" class="btn btn-primary" disabled>⏹️ Stop</button>
                    <button id="reset-stopwatch-btn" class="btn btn-primary">🔄 Reset</button>
                </div>
                
                <!-- Lap Times -->
                <div id="lap-times-container" style="display: none;">
                    <h5 style="color: #42f8f5; margin-bottom: 10px;">Lap Times:</h5>
                    <div id="lap-times" style="max-height: 200px; overflow-y: auto; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        <!-- Lap times will be displayed here -->
                    </div>
                    <button id="clear-laps-btn" class="btn btn-primary" style="margin-top: 10px; padding: 5px 10px; font-size: 0.8em;">Clear Laps</button>
                </div>
            </div>
        </div>
        
        <!-- Sound Settings -->
        <div style="background: rgba(18, 21, 26, 0.8); padding: 15px; border-radius: 8px;">
            <h5 style="color: #42f8f5; margin-bottom: 10px;">Sound Settings:</h5>
            <div style="display: flex; gap: 15px; align-items: center;">
                <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" id="sound-enabled" checked>
                    <span>Enable sound notifications</span>
                </label>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="sound-volume">Volume:</label>
                    <input type="range" id="sound-volume" min="0" max="1" step="0.1" value="0.5" style="width: 100px;">
                    <span id="volume-display">50%</span>
                </div>
            </div>
        </div>
    `

  setTimeout(() => {
    // Tab elements
    const timerTab = document.getElementById("timer-tab")
    const stopwatchTab = document.getElementById("stopwatch-tab")
    const timerSection = document.getElementById("timer-section")
    const stopwatchSection = document.getElementById("stopwatch-section")

    // Timer elements
    const timerHours = document.getElementById("timer-hours")
    const timerMinutes = document.getElementById("timer-minutes")
    const timerSeconds = document.getElementById("timer-seconds")
    const quickTimerBtns = document.querySelectorAll(".quick-timer-btn")
    const timerDisplay = document.getElementById("timer-display")
    const timerStatus = document.getElementById("timer-status")
    const timerProgressContainer = document.getElementById("timer-progress-container")
    const timerProgress = document.getElementById("timer-progress")
    const startTimerBtn = document.getElementById("start-timer-btn")
    const pauseTimerBtn = document.getElementById("pause-timer-btn")
    const resetTimerBtn = document.getElementById("reset-timer-btn")

    // Stopwatch elements
    const stopwatchDisplay = document.getElementById("stopwatch-display")
    const stopwatchMilliseconds = document.getElementById("stopwatch-milliseconds")
    const startStopwatchBtn = document.getElementById("start-stopwatch-btn")
    const lapBtn = document.getElementById("lap-btn")
    const stopStopwatchBtn = document.getElementById("stop-stopwatch-btn")
    const resetStopwatchBtn = document.getElementById("reset-stopwatch-btn")
    const lapTimesContainer = document.getElementById("lap-times-container")
    const lapTimes = document.getElementById("lap-times")
    const clearLapsBtn = document.getElementById("clear-laps-btn")

    // Sound elements
    const soundEnabled = document.getElementById("sound-enabled")
    const soundVolume = document.getElementById("sound-volume")
    const volumeDisplay = document.getElementById("volume-display")

    // Timer state
    let timerInterval = null
    let timerTotalSeconds = 300 // 5 minutes default
    let timerRemainingSeconds = 300
    let timerRunning = false

    // Stopwatch state
    let stopwatchInterval = null
    let stopwatchStartTime = 0
    let stopwatchElapsed = 0
    let stopwatchRunning = false
    let lapCounter = 0
    let lapStartTime = 0

    // Audio context for beep sounds
    let audioContext

    // Initialize audio context
    function initAudio() {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
      }
    }

    // Play beep sound
    function playBeep(frequency = 800, duration = 200) {
      if (!soundEnabled.checked) return

      initAudio()

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(soundVolume.value, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    }

    // Format time display
    function formatTime(totalSeconds, showMilliseconds = false) {
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = Math.floor(totalSeconds % 60)

      if (showMilliseconds) {
        const milliseconds = Math.floor((totalSeconds % 1) * 1000)
        return {
          time: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          ms: `.${milliseconds.toString().padStart(3, "0")}`,
        }
      }

      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    // Tab switching
    function showTab(activeTab) {
      ;[timerTab, stopwatchTab].forEach((tab) => {
        tab.style.background = "var(--bg-button)"
        tab.style.color = "var(--accent-primary)"
      })

      activeTab.style.background = "var(--accent-primary)"
      activeTab.style.color = "var(--bg-main)"

      if (activeTab === timerTab) {
        timerSection.style.display = "block"
        stopwatchSection.style.display = "none"
      } else {
        timerSection.style.display = "none"
        stopwatchSection.style.display = "block"
      }
    }

    // Timer functions
    function updateTimerDisplay() {
      timerDisplay.textContent = formatTime(timerRemainingSeconds)

      if (timerRunning && timerTotalSeconds > 0) {
        const progress = ((timerTotalSeconds - timerRemainingSeconds) / timerTotalSeconds) * 100
        timerProgress.style.width = progress + "%"
      }
    }

    function setTimerFromInputs() {
      const hours = Number.parseInt(timerHours.value) || 0
      const minutes = Number.parseInt(timerMinutes.value) || 0
      const seconds = Number.parseInt(timerSeconds.value) || 0

      timerTotalSeconds = hours * 3600 + minutes * 60 + seconds
      timerRemainingSeconds = timerTotalSeconds
      updateTimerDisplay()
    }

    function startTimer() {
      if (timerRemainingSeconds <= 0) {
        showNotification("Please set a timer duration", "error")
        return
      }

      timerRunning = true
      timerProgressContainer.style.display = "block"
      timerStatus.textContent = "Running"

      startTimerBtn.disabled = true
      pauseTimerBtn.disabled = false

      timerInterval = setInterval(() => {
        timerRemainingSeconds--
        updateTimerDisplay()

        if (timerRemainingSeconds <= 0) {
          // Timer finished
          clearInterval(timerInterval)
          timerRunning = false
          timerStatus.textContent = "Finished!"
          timerStatus.style.color = "#4eff91"

          startTimerBtn.disabled = false
          pauseTimerBtn.disabled = true

          // Play completion sound
          playBeep(1000, 500)
          setTimeout(() => playBeep(1200, 500), 600)
          setTimeout(() => playBeep(1400, 500), 1200)

          showNotification("Timer finished!", "success")
        } else if (timerRemainingSeconds <= 10) {
          // Play warning beeps in last 10 seconds
          playBeep(600, 100)
        }
      }, 1000)

      showNotification("Timer started", "success")
    }

    function pauseTimer() {
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }

      timerRunning = false
      timerStatus.textContent = "Paused"
      timerStatus.style.color = "#ffcc4e"

      startTimerBtn.disabled = false
      pauseTimerBtn.disabled = true

      showNotification("Timer paused", "info")
    }

    function resetTimer() {
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }

      timerRunning = false
      setTimerFromInputs()
      timerStatus.textContent = "Ready"
      timerStatus.style.color = "#c5d1de"
      timerProgressContainer.style.display = "none"
      timerProgress.style.width = "0%"

      startTimerBtn.disabled = false
      pauseTimerBtn.disabled = true

      showNotification("Timer reset", "info")
    }

    // Stopwatch functions
    function updateStopwatchDisplay() {
      const totalElapsed = stopwatchElapsed + (stopwatchRunning ? (Date.now() - stopwatchStartTime) / 1000 : 0)
      const formatted = formatTime(totalElapsed, true)

      stopwatchDisplay.textContent = formatted.time
      stopwatchMilliseconds.textContent = formatted.ms
    }

    function startStopwatch() {
      stopwatchRunning = true
      stopwatchStartTime = Date.now()
      lapStartTime = Date.now()

      startStopwatchBtn.disabled = true
      lapBtn.disabled = false
      stopStopwatchBtn.disabled = false

      stopwatchInterval = setInterval(updateStopwatchDisplay, 10)

      showNotification("Stopwatch started", "success")
    }

    function recordLap() {
      const currentTime = Date.now()
      const totalElapsed = stopwatchElapsed + (currentTime - stopwatchStartTime) / 1000
      const lapTime = (currentTime - lapStartTime) / 1000

      lapCounter++

      const totalFormatted = formatTime(totalElapsed, true)
      const lapFormatted = formatTime(lapTime, true)

      const lapElement = document.createElement("div")
      lapElement.style.cssText =
        "display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.1);"
      lapElement.innerHTML = `
                <span>Lap ${lapCounter}</span>
                <span>${lapFormatted.time}${lapFormatted.ms}</span>
                <span>${totalFormatted.time}${totalFormatted.ms}</span>
            `

      lapTimes.insertBefore(lapElement, lapTimes.firstChild)
      lapTimesContainer.style.display = "block"

      lapStartTime = currentTime
      playBeep(800, 100)

      showNotification(`Lap ${lapCounter} recorded`, "success")
    }

    function stopStopwatch() {
      if (stopwatchInterval) {
        clearInterval(stopwatchInterval)
        stopwatchInterval = null
      }

      if (stopwatchRunning) {
        stopwatchElapsed += (Date.now() - stopwatchStartTime) / 1000
        stopwatchRunning = false
      }

      startStopwatchBtn.disabled = false
      lapBtn.disabled = true
      stopStopwatchBtn.disabled = true

      playBeep(600, 200)
      showNotification("Stopwatch stopped", "info")
    }

    function resetStopwatch() {
      if (stopwatchInterval) {
        clearInterval(stopwatchInterval)
        stopwatchInterval = null
      }

      stopwatchRunning = false
      stopwatchElapsed = 0
      lapCounter = 0

      updateStopwatchDisplay()

      startStopwatchBtn.disabled = false
      lapBtn.disabled = true
      stopStopwatchBtn.disabled = true

      lapTimes.innerHTML = ""
      lapTimesContainer.style.display = "none"

      showNotification("Stopwatch reset", "info")
    }

    function clearLaps() {
      lapTimes.innerHTML = ""
      lapTimesContainer.style.display = "none"
      lapCounter = 0
      showNotification("Lap times cleared", "info")
    }

    // Event listeners
    timerTab.addEventListener("click", () => showTab(timerTab))
    stopwatchTab.addEventListener("click", () => showTab(stopwatchTab))

    // Timer input changes
    ;[timerHours, timerMinutes, timerSeconds].forEach((input) => {
      input.addEventListener("change", setTimerFromInputs)
    })

    // Quick timer buttons
    quickTimerBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const seconds = Number.parseInt(this.dataset.time)
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60

        timerHours.value = hours
        timerMinutes.value = minutes
        timerSeconds.value = remainingSeconds

        setTimerFromInputs()
      })
    })

    // Timer controls
    startTimerBtn.addEventListener("click", startTimer)
    pauseTimerBtn.addEventListener("click", pauseTimer)
    resetTimerBtn.addEventListener("click", resetTimer)

    // Stopwatch controls
    startStopwatchBtn.addEventListener("click", startStopwatch)
    lapBtn.addEventListener("click", recordLap)
    stopStopwatchBtn.addEventListener("click", stopStopwatch)
    resetStopwatchBtn.addEventListener("click", resetStopwatch)
    clearLapsBtn.addEventListener("click", clearLaps)

    // Sound controls
    soundVolume.addEventListener("input", function () {
      volumeDisplay.textContent = Math.round(this.value * 100) + "%"
    })

    // Initialize
    showTab(timerTab)
    setTimerFromInputs()
    updateStopwatchDisplay()

    // Start stopwatch display update interval
    setInterval(updateStopwatchDisplay, 10)
  }, 100)

  return toolSection
}
