import unittest
from pid_controller import PIDController

class TestPIDController(unittest.TestCase):

    def test_pid_update_proportional(self):
        """
        Test du terme proportionnel du PID.
        
        Vérifie que la sortie est le produit de l'erreur et du gain proportionnel.
        """
        pid = PIDController(kp=1.0, ki=0.0, kd=0.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 10.0)

    def test_pid_update_integral(self):
        """
        Test du terme intégral du PID.
        
        Vérifie que l'intégrale de l'erreur est correctement accumulée.
        """
        pid = PIDController(kp=0.0, ki=1.0, kd=0.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 10.0)

        output = pid.update(error, dt)
        self.assertEqual(output, 20.0)

    def test_pid_update_derivative(self):
        """
        Test du terme dérivatif du PID.
        
        Vérifie que la dérivée de l'erreur est correcte et devient nulle si l'erreur reste constante.
        """
        pid = PIDController(kp=0.0, ki=0.0, kd=1.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 10.0)

        output = pid.update(error, dt)
        self.assertEqual(output, 0.0)

    def test_pid_update_combined(self):
        """
        Test combiné des termes PID.
        
        Vérifie que la sortie est la somme des contributions proportionnelle, intégrale, et dérivative.
        """
        pid = PIDController(kp=1.0, ki=1.0, kd=1.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 30.0)

if __name__ == '__main__':
    unittest.main()
