const mockFetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ countries: [] }), // Mock the response structure here
    })
  );
  
  global.fetch = mockFetch as any;