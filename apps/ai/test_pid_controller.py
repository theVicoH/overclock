import unittest
from pid_controller import PIDController

class TestPIDController(unittest.TestCase):
    def test_pid_controller_initialization(self):
        pid = PIDController(0.1, 0.01, 0.05)
        self.assertEqual(pid.kp, 0.1)
        self.assertEqual(pid.ki, 0.01)
        self.assertEqual(pid.kd, 0.05)

    def test_pid_controller_update(self):
        pid = PIDController(0.1, 0.01, 0.05)
        output = pid.update(10, 1)
        self.assertNotEqual(output, 0)
        self.assertEqual(pid.last_error, 10)

if __name__ == '__main__':
    unittest.main()
