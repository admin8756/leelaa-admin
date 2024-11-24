// 表单验证工具函数
export const validators = {
  required: (value) => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    return value !== undefined && value !== null && value !== ''
  },
  
  email: (value) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return !value || pattern.test(value)
  },
  
  phone: (value) => {
    const pattern = /^1[3-9]\d{9}$/
    return !value || pattern.test(value)
  },
  
  number: (value) => {
    return !value || !isNaN(value)
  },
  
  url: (value) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }
}

// 文件处理工具函数
export const fileUtils = {
  getFileSize: (size) => {
    if (size < 1024) {
      return size + ' B'
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB'
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + ' MB'
    }
    return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  },

  getFileType: (file) => {
    if (file.type.startsWith('image/')) {
      return 'image'
    } else if (file.type.startsWith('video/')) {
      return 'video'
    }
    return 'file'
  },

  compressImage: async (file, { maxWidth = 1920, quality = 0.8 } = {}) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const img = new Image()
        img.src = e.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          let width = img.width
          let height = img.height
          
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
          
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
          
          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, { type: file.type }))
            },
            file.type,
            quality
          )
        }
      }
    })
  }
}

// GPS 工具函数
export const gpsUtils = {
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('浏览器不支持地理位置'))
        return
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          })
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    })
  }
}

// 相机工具函数
export const cameraUtils = {
  getVideoStream: async (constraints = { video: true }) => {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints)
    } catch (error) {
      console.error('获取摄像头失败:', error)
      throw error
    }
  },
  
  takePhoto: (videoElement) => {
    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight
    
    const context = canvas.getContext('2d')
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/jpeg', 0.95)
    })
  }
}

// 打印工具函数
export const printUtils = {
  print: (element, options = {}) => {
    const defaults = {
      title: document.title,
      style: `
        @media print {
          @page { margin: 1cm; }
          body { margin: 0; }
        }
      `
    }
    
    const config = { ...defaults, ...options }
    const printWindow = window.open('', '_blank')
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${config.title}</title>
          <style>${config.style}</style>
        </head>
        <body>${element.innerHTML}</body>
      </html>
    `)
    
    printWindow.document.close()
    printWindow.focus()
    
    // 等待图片加载完成后打印
    const images = printWindow.document.getElementsByTagName('img')
    let loadedImages = 0
    
    if (images.length === 0) {
      printWindow.print()
      printWindow.close()
    } else {
      Array.from(images).forEach(img => {
        img.onload = () => {
          loadedImages++
          if (loadedImages === images.length) {
            printWindow.print()
            printWindow.close()
          }
        }
      })
    }
  }
}
