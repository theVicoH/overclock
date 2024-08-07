import unittest
from unittest.mock import patch, MagicMock
#import cv2
from utils import initialize_yolo, connect_mqtt
from pid_controller import PIDController
import detect

class TestIntegration(unittest.TestCase):
    @patch('cv2.VideoCapture')
    @patch('utils.initialize_yolo')
    @patch('utils.connect_mqtt')
    def test_main(self, mock_connect_mqtt, mock_initialize_yolo, mock_VideoCapture):
        mock_initialize_yolo.return_value = MagicMock()
        mock_connect_mqtt.return_value = MagicMock()
        mock_VideoCapture.return_value.read.return_value = (True, MagicMock())
        
        with patch('cv2.imshow'), patch('cv2.waitKey', return_value=ord('q')):
            detect.main()
        
        mock_initialize_yolo.assert_called_once()
        mock_connect_mqtt.assert_called_once()
        mock_VideoCapture.assert_called_once_with("url cam")

if __name__ == '__main__':
    unittest.main()
