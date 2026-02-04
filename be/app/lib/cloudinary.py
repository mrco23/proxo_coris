"""Cloudinary integration for file uploads"""
import cloudinary
import cloudinary.uploader
from flask import current_app

from app.utils.logger import logger


def init_cloudinary():
    cloudinary.config(
        cloud_name=current_app.config.get('CLOUDINARY_CLOUD_NAME'),
        api_key=current_app.config.get('CLOUDINARY_API_KEY'),
        api_secret=current_app.config.get('CLOUDINARY_API_SECRET'),
        secure=True
    )


def upload_image(file, folder="uploads", public_id=None, transformation=None):
    try:
        init_cloudinary()
        
        upload_options = {"folder": folder, "resource_type": "image", "overwrite": True}
        
        if public_id:
            upload_options["public_id"] = public_id
        
        if transformation:
            upload_options["transformation"] = transformation
        
        result = cloudinary.uploader.upload(file, **upload_options)
        
        logger.info(f"Image uploaded: {result.get('public_id')}")
        
        return {
            "url": result.get("secure_url"),
            "public_id": result.get("public_id"),
            "format": result.get("format"),
            "width": result.get("width"),
            "height": result.get("height"),
            "bytes": result.get("bytes")
        }
        
    except Exception as e:
        logger.error(f"Failed to upload image: {e}")
        return None


def delete_image(public_id):
    try:
        init_cloudinary()
        result = cloudinary.uploader.destroy(public_id)
        
        if result.get("result") == "ok":
            logger.info(f"Image deleted: {public_id}")
            return True
        return False
        
    except Exception as e:
        logger.error(f"Failed to delete image: {e}")
        return False


def get_image_url(public_id, width=None, height=None, crop="fill"):
    init_cloudinary()
    
    transformations = []
    
    if width or height:
        transform = {"crop": crop}
        if width:
            transform["width"] = width
        if height:
            transform["height"] = height
        transformations.append(transform)
    
    url, _ = cloudinary.utils.cloudinary_url(
        public_id,
        transformation=transformations if transformations else None,
        secure=True
    )
    
    return url
