"""Logging configuration"""
import os
import sys
import logging
from logging.handlers import RotatingFileHandler


def setup_logger(name='app', log_level='INFO', log_dir='logs'):
    logger = logging.getLogger(name)
    
    if logger.handlers:
        return logger
    
    logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))
    
    formatter = logging.Formatter(
        '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    # File handler
    try:
        os.makedirs(log_dir, exist_ok=True)
        
        file_handler = RotatingFileHandler(
            os.path.join(log_dir, f'{name}.log'),
            maxBytes=10 * 1024 * 1024,
            backupCount=5
        )
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
        
        error_handler = RotatingFileHandler(
            os.path.join(log_dir, f'{name}_error.log'),
            maxBytes=10 * 1024 * 1024,
            backupCount=5
        )
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(formatter)
        logger.addHandler(error_handler)
        
    except (OSError, IOError):
        pass
    
    return logger


logger = setup_logger()
