
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLogin, useRegister } from "../store/auth-store";

import { Card, Input, Button, Typography, Flex, Space } from "antd";

const { Text } = Typography;

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = searchParams.get("step") || "login";
  const [step, setStep] = useState(currentStep);

  const handleStepChange = (newStep) => {
    setSearchParams({ step: newStep });
    setStep(newStep);
  };

  const { login, loginPending } = useLogin();
  const { register, registerisPending } = useRegister();

  const handleSubmit = () => {
    if (step === "login") {
      login({ email, password });
    } else {
      register({ email, password });
    }
  };

  return (
    <Flex justify="center" align="center" vertical>
      <Card style={{ width: 320 }}>
        <Space size="middle" style={{ width: "100%" }}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loginPending || registerisPending}
            block
          >
            {step === "login" ? "Войти" : "Регистрация"}
          </Button>
        </Space>
      </Card>

      <Card variant="outlined" style={{ width: 320 }}>
        <Flex justify="center">
          {step === "login" ? (
            <Text>
              Еще нет аккаунта?{" "}
              <Text
                type="primary"
                onClick={() => handleStepChange("register")}
                style={{ color:'blue',cursor: "pointer" }}
              >
                Зарегистрироваться
              </Text>
            </Text>
          ) : (
            <Text>
              Уже есть аккаунт?{" "}
              <Text
                type="primary"
                onClick={() => handleStepChange("login")}
                style={{color:'blue', cursor: "pointer" }}
              >
                Войти
              </Text>
            </Text>
          )}
        </Flex>
      </Card>
    </Flex>
  );
}
