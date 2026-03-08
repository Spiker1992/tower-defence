/** @jest-environment jsdom */
import { renderDebugPanel, truncateUuid } from "./debug_panel";
import { EventStore } from "../commons/event_store";

// Mock the EventStore
jest.mock("../commons/event_store", () => ({
    EventStore: {
        getHistory: jest.fn(),
    },
}));

describe("debug_panel", () => {
    let debugPanelElement: HTMLElement;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Setup a mock DOM element for the debug panel
        debugPanelElement = document.createElement("div");
        debugPanelElement.id = "debug-panel";
        document.body.appendChild(debugPanelElement);
    });

    afterEach(() => {
        // Clean up the mock DOM element
        document.body.removeChild(debugPanelElement);
    });

    it("should handle non-string uuid in EventStore history safely", () => {
        // Arrange
        (EventStore.getHistory as jest.Mock).mockReturnValue([
            {
                type: "EnemyAddedToTheMap",
                uuid: 12345, // This should NOT cause the error now
                position: { col: 0, row: 0 },
            },
        ]);

        // Act
        renderDebugPanel();

        // Assert
        const panel = document.getElementById("debug-panel");
        expect(panel?.innerHTML).toContain("12345...");
    });

    it("should correctly truncate a valid uuid", () => {
        const uuid = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6";
        expect(truncateUuid(uuid)).toBe("a1b2c3d4...");
    });
});
