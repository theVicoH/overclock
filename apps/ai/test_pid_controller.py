# test_pid_controller.py
import unittest
from pid_controller import PIDController 
class TestPIDController(unittest.TestCase):
    
    def setUp(self):
        self.pid = PIDController(kp=1.0, ki=0.1, kd=0.01)

    def test_initial_values(self):
        self.assertEqual(self.pid.integral, 0)
        self.assertEqual(self.pid.last_error, 0)
    
    def test_update(self):
        dt = 1.0
        error = 1.0
        output = self.pid.update(error, dt)
        
        expected_output = (self.pid.kp * error + 
                           self.pid.ki * (error * dt) + 
                           self.pid.kd * (error / dt))
        
        self.assertAlmostEqual(output, expected_output)

    def test_integral_accumulation(self):
        dt = 1.0
        error = 1.0
        
        self.pid.update(error, dt)  # First update
        self.assertEqual(self.pid.integral, error * dt)
        
        self.pid.update(error, dt)  # Second update
        self.assertEqual(self.pid.integral, 2 * error * dt)
    
    def test_derivative(self):
        dt = 1.0
        error1 = 1.0
        error2 = 2.0
        
        self.pid.update(error1, dt)  # First update
        output1 = self.pid.update(error2, dt)  # Second update
        
        expected_derivative = (error2 - error1) / dt
        expected_output = (self.pid.kp * error2 + 
                           self.pid.ki * self.pid.integral + 
                           self.pid.kd * expected_derivative)
        
        self.assertAlmostEqual(output1, expected_output)
    
    def test_zero_dt(self):
        dt = 0.0
        error = 1.0
        with self.assertRaises(ZeroDivisionError):
            self.pid.update(error, dt)

if __name__ == "__main__":
    unittest.main()
