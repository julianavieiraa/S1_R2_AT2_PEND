import createMulter from "../config/produto.multer";
const uploadImage = createMulter ({ 
    folder: 'produtos',
    allowedTypes: ['Images/jpeg', 'image/png'],
    fileSize: 10 * 1024* 1024
}).single('image');

export default uploadImage;