import imageHandler from '../controller/index.js';
import  express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await imageHandler(req, res);
    console.log('Cloudinary upload result:', result);
    const secureUrl = result.secure_url || result.secucarImagere_url;

    if (!secureUrl) {
      console.error('Secure URL is undefined in Cloudinary response:', result);
      return res
        .status(500)
        .json({ success: false, error: 'Image upload failed' });
    }

    const { public_id } = result;

    res.status(200).json({ success: true, profileImage: secureUrl, public_id });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, error: 'Image upload failed' });
  }
});

export default router