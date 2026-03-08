import { truncateUuid } from "./debug_panel";

describe("truncateUuid", () => {
    it("should return a string for a non-string input", () => {
        const nonStringUuid: any = 12345;
        expect(truncateUuid(nonStringUuid)).toBe("12345...");
    });

    it("should correctly truncate a valid uuid string", () => {
        const uuid = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6";
        expect(truncateUuid(uuid)).toBe("a1b2c3d4...");
    });
});
