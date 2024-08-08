import unittest
from unittest.mock import patch, MagicMock
import cv2
from detect import main

class TestIntegration(unittest.TestCase):
    @patch("cv2.VideoCapture")
    @patch("utils.initialize_yolo")
    @patch("utils.connect_mqtt")
    @patch("utils.read_messages")
    @patch("utils.send_message")
    def test_main(self, mock_send_message, mock_read_messages, mock_connect_mqtt, mock_initialize_yolo, mock_VideoCapture):
        # Configurer les mocks
        mock_initialize_yolo.return_value = MagicMock()
        mock_connect_mqtt.return_value = MagicMock()
        mock_VideoCapture.return_value.read.return_value = (True, MagicMock())
        
        # Mock de la fonction `process_frame` pour éviter de traiter les images
        with patch("detect.process_frame") as mock_process_frame:
            # Exécuter la fonction principale
            with patch("cv2.imshow"), patch("cv2.waitKey", return_value=ord("q")):
                main()

            # Vérifiez les appels des fonctions
            mock_initialize_yolo.assert_called_once()
            mock_connect_mqtt.assert_called_once()
            mock_VideoCapture.assert_called_once_with("url")
            mock_send_message.assert_called()  # Vérifier que send_message a été appelé
            mock_read_messages.assert_called_once_with(mock_connect_mqtt.return_value, "esp32/sonar")
            mock_process_frame.assert_called()  # Vérifier que process_frame a été appelé avec les bons arguments

if __name__ == "__main__":
    unittest.main()
