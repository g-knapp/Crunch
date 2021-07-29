import Sidebar from './Sidebar';
import { screen, fireEvent, render } from '@testing-library/react';

const sampleGroups = [{name: "Hiking Group"}, {name: "Memes"}, {name: "Campus Updates"}];



describe('Sidebar initialization', () => {
    test('Handles empty array without error', () => {
      //const handler = jest.fn();
      render(<Sidebar groupings={[]}/>);
    });
});

describe('Sidebar tests', () => {
  
    beforeEach(() => {
      render(<Sidebar groupings={sampleGroups} />);
    });

    test('Fetches and displays groups', async () => {
        const items = await screen.getAllByTestId('group-sidebar');

        expect(items).toHaveLength(sampleGroups.length);
        sampleGroups.forEach((group) => {
          expect(screen.getByTestId(`group:${group.name}`)).toBeVisible();
        });
    });

    test('Clicking on a group selects titles', async () => {

        const group = await screen.getByTestId(`group:${sampleGroups[0].name}`);
        expect(group).toHaveAttribute('href', `/groups/${sampleGroups[0].name}`)
    
        //fireEvent.click(group);
        //expect(selectFunction).toHaveBeenCalledWith(sampleGroups[0]);
      });

    test('Fetches and displays groups', async () => {
      let term = "Mem";
      const searchBar = await screen.getByTestId('search-sidebar').querySelector('input');
      fireEvent.change(searchBar, { target: { value: term } });
      term = term.toLowerCase();

      const filteredGroups = sampleGroups.filter((group) => {
        const title = group.name.toLowerCase();
        return title.includes(term)
      });

      const items = screen.getAllByTestId('group-sidebar');
      expect(items).toHaveLength(filteredGroups.length);
    });

    test('Searchbar filters lists', async () => {

    })
});