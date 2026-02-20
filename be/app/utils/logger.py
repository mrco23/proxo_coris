"""Logging configuration"""
import sys
import logging


def setup_logger(name='app', log_level='INFO'):
    logger = logging.getLogger(name)
    
    if logger.handlers:
        return logger
    
    logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))
    
    formatter = logging.Formatter(
        '[%(asctime)s] %(levelname)s | %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    # Matikan logger default bawaan flask/werkzeug
    werkzeug_logger = logging.getLogger('werkzeug')
    werkzeug_logger.setLevel(logging.ERROR)
    
    return logger


logger = setup_logger()
