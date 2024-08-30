class PIDController:
    def __init__(self, kp, ki, kd):
        """
        Initialise un contrôleur PID avec les paramètres de gain.

        Args:
            kp (float): Gain proportionnel.
            ki (float): Gain intégral.
            kd (float): Gain dérivatif.
        """
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.integral = 0
        self.last_error = 0

    def update(self, error, dt):
        """
        Calcule le signal de contrôle basé sur l'erreur et le temps écoulé.

        Args:
            error (float): Erreur actuelle à corriger.
            dt (float): Temps écoulé depuis la dernière mise à jour.

        Returns:
            float: Valeur du signal de contrôle.
        """
        self.integral += error * dt
        derivative = (error - self.last_error) / dt
        output = self.kp * error + self.ki * self.integral + self.kd * derivative
        self.last_error = error
        return output
