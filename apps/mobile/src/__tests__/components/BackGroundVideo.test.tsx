import React from "react";
import BackgroundVideoComponent from "../../components/BackGroundVideo";
import { Text, View } from "react-native";
import { render, screen, act } from "@testing-library/react";
import { vi, afterEach, beforeEach, describe, it, expect } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

beforeEach(() => {
  vi.mock("react-native-video", () => {
    const MockVideo = ({
      onLoad,
      onLoadStart,
      onError,
      onBuffer,
    }: {
      onLoad?: (data: object) => void;
      onLoadStart?: (data: object) => void;
      onError?: (data: { error: string }) => void;
      onBuffer?: (data: { isBuffering: boolean }) => void;
    }) => {
      React.useEffect(() => {
        if (onLoadStart) {
          onLoadStart({});
        }

        if (onBuffer) {
          onBuffer({ isBuffering: true });
          setTimeout(() => {
            onBuffer({ isBuffering: false });
          }, 100);
        }

        if (onLoad) {
          setTimeout(() => {
            onLoad({});
          }, 200);
        }
      }, [onLoadStart, onBuffer, onError, onLoad]);

      return <View testID="video-component" />;
    };

    return {
      __esModule: true,
      default: MockVideo,
    };
  });
});

describe("Video Component", () => {
  it("should show loading indicator on start", async () => {
    await act(async () => {
      render(
        <BackgroundVideoComponent active={true} url="test">
          <Text>Child Component</Text>
        </BackgroundVideoComponent>
      );
    });

    const loadingIndicator = screen.getByTestId("load-section");
    expect(loadingIndicator).toBeTruthy();
  });

  it("should render empty section when not active", async () => {
    await act(async () => {
      render(
        <BackgroundVideoComponent url="test" active={false}>
          <Text>Child text</Text>
        </BackgroundVideoComponent>
      );
    });

    const component = screen.getByTestId("empty-section");
    expect(component).toBeTruthy();
  });

  /*it("should show error message when there is an error", async () => {
    // Mock de 'react-native-video' pour simuler une erreur
    vi.doMock("react-native-video", () => {
      const MockVideo = ({
        onError,
      }: {
        onError?: (data: { error: string }) => void;
      }) => {
        React.useEffect(() => {
          // Simuler l'état d'erreur immédiatement
          if (onError) {
            onError({ error: "error message" });
          }
        }, [onError]);

        return <View testID="video-component"></View>;
      };

      return {
        __esModule: true,
        default: MockVideo,
      };
    });

    await act(async () => {
      render(
        <BackgroundVideoComponent active={true} src="test">
          <Text>Child Component</Text>
        </BackgroundVideoComponent>
      );
    });

    // Vérifier que l'état d'erreur est rendu
    const results = screen.getByTestId("error-section");
    expect(results).toBeTruthy();

    // Réinitialiser les mocks après le test
    vi.resetAllMocks();
  });*/
});
