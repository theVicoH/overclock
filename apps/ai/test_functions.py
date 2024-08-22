import unittest
from unittest.mock import MagicMock, patch
import paho.mqtt.client as mqtt
import torch
from functions import connect_mqtt, send_message, initialize_yolo

class TestFunctions(unittest.TestCase):

    @patch('functions.mqtt.Client')
    def test_connect_mqtt(self, MockClient):
        mock_client = MockClient.return_value
        mock_client.connect.return_value = mqtt.MQTT_ERR_SUCCESS
        
        client = connect_mqtt()
        
        mock_client.username_pw_set.assert_called_once_with("guest", "guest")
        mock_client.connect.assert_called_once_with("176.132.246.222", 5701, 60)
        self.assertEqual(client, mock_client)
        
    @patch('functions.mqtt.Client')
    def test_send_message_success(self, MockClient):
        mock_client = MockClient.return_value
        mock_client.publish.return_value.rc = mqtt.MQTT_ERR_SUCCESS
        
        send_message(mock_client, "test/topic", "Test Payload")
        
        mock_client.publish.assert_called_once_with("test/topic", "Test Payload")

    @patch('functions.mqtt.Client')
    def test_send_message_failure(self, MockClient):
        mock_client = MockClient.return_value
        mock_client.publish.return_value.rc = mqtt.MQTT_ERR_NO_CONN
        
        with self.assertRaises(SystemExit):  # fail_on_error calls exit(1)
            send_message(mock_client, "test/topic", "Test Payload")
        
        mock_client.publish.assert_called_once_with("test/topic", "Test Payload")
        
    @patch('torch.hub.load')
    def test_initialize_yolo(self, mock_load):
        mock_model = MagicMock()
        mock_load.return_value = mock_model
        
        model_path = '../yolo/yolov7-w6.pt'
        model = initialize_yolo(model_path)
        
        mock_load.assert_called_once_with('WongKinYiu/yolov7', 'custom', path_or_model=model_path, source='github')
        self.assertEqual(model, mock_model)

if __name__ == '__main__':
    unittest.main()