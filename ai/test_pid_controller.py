import unittest
from pid_controller import PIDController

class TestPIDController(unittest.TestCase):

    def test_pid_update_proportional(self):
        pid = PIDController(kp=1.0, ki=0.0, kd=0.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 10.0)  # Terme proportionnel seulement (1.0 * 10)

    def test_pid_update_integral(self):
        pid = PIDController(kp=0.0, ki=1.0, kd=0.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 10.0)  # Terme intégral après un pas de temps (1.0 * 10)

        # Après le second appel, l'intégrale sera cumulée
        output = pid.update(error, dt)
        self.assertEqual(output, 20.0)  # L'intégrale est maintenant 20.0

    def test_pid_update_derivative(self):
        pid = PIDController(kp=0.0, ki=0.0, kd=1.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 10.0)  # Terme dérivé seulement (première dérivée est 10)

        #Second appel ca bougera pas  
        output = pid.update(error, dt)
        self.assertEqual(output, 0.0)  # Pas de changement dans l'erreur, donc dérivée est 0

    def test_pid_update_combined(self):
        pid = PIDController(kp=1.0, ki=1.0, kd=1.0)
        error = 10
        dt = 1.0
        output = pid.update(error, dt)
        self.assertEqual(output, 30.0)  # Somme des trois termes

if __name__ == '__main__':
    unittest.main()
