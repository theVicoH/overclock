import unittest
from unittest.mock import MagicMock, patch
import cv2
from detect import main

class TestIntegration(unittest.TestCase):

    @patch('detect.initialize_yolo')
    @patch('detect.connect_mqtt')
    @patch('cv2.VideoCapture')
    @patch('detect.process_frame')
    def test_main_loop(self, mock_process_frame, mock_VideoCapture, mock_connect_mqtt, mock_initialize_yolo):
        mock_model = MagicMock()
        mock_initialize_yolo.return_value = mock_model
        
        mock_pid = MagicMock()
        mock_client = MagicMock()
        mock_connect_mqtt.return_value = mock_client
        
        mock_cap = MagicMock()
        mock_VideoCapture.return_value = mock_cap
        
        mock_cap.isOpened.return_value = True
        mock_cap.read.side_effect = [(True, MagicMock()), (False, None)]  # Read one frame, then fail
        
        with patch('cv2.imshow'), patch('cv2.waitKey', return_value=ord('q')):
            main()
        
        mock_initialize_yolo.assert_called_once()
        mock_connect_mqtt.assert_called_once()
        mock_VideoCapture.assert_called_once_with(0)
        mock_process_frame.assert_called_once()

if __name__ == '__main__':
    unittest.main()
