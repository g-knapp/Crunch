import { render, screen, fireEvent } from "@testing-library/react";
import CreateGroup from "./CreateGroup";

describe('Group object is created', () => {
    let group;
    const handler = jest.fn();

    beforeEach(() => {
        group = {
          name: "TestGroup",
          purpose: "Grouping for Testing",
          dateCreated: new Date("2020-06-10T14:54:40Z").toISOString(),
        };
    
        handler.mockReset();
      });

    test("Cancel button renders", () => {
        render(<CreateGroup select={handler}/>);
        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        expect(cancelButton).toBeInTheDocument();
    });

    test("Save disabled if name is not filled in", () => {
      render(
          <CreateGroup select={handler} />
      );
      const saveButton = screen.getByRole("button", { name: "Save" });
      expect(saveButton).toHaveAttribute('disabled');
    
    });

    test('new Group formed on save', () => {
        render(<CreateGroup select={handler}/>);
        const nameInput = screen.getByTestId("group-name").querySelector('input');
        const purposeInput = screen.getByTestId("group-purpose").querySelector('input');
        const saveButton = screen.getByRole("button", { name: "Save" });

        fireEvent.change(nameInput, { target: { value: group.name } });
        fireEvent.change(purposeInput, { target: { value: group.purpose } });
        fireEvent.click(saveButton);

        expect(handler).toHaveBeenCalled();
        
        // const newGroup = handler.mock.calls[0][0]; // value the handler was called with

        // expect(newGroup.name).toEqual(group.name);
        // expect(newGroup.purpose).toEqual(group.purpose);
    });
});