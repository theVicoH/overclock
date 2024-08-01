class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.integral = 0
        self.derivative = 0
        self.last_error = 0
        self.output = 0

    def update(self, error, dt):
        self.integral += error * dt
        self.derivative = (error - self.last_error) / dt
        self.output = self.kp * error + self.ki * self.integral + self.kd * self.derivative
        self.last_error = error
