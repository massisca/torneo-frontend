//src/theme.js
 
export const theme = {
  colorScheme: 'light',
  primaryColor: 'red',
  fontFamily: 'Bebas Neue, sans-serif',
  headings: {
    fontFamily: 'Bebas Neue, sans-serif',
    sizes: {
      h1: { fontSize: '3rem' },
      h2: { fontSize: '2.5rem' },
      h3: { fontSize: '2rem' },
    },
  },
  components: {
    Button: {
      styles: () => ({
        root: {
          fontWeight: 'bold',
          borderRadius: '6px',
        },
      }),
    },
    Paper: {
      styles: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    Title: {
      styles: {
        root: {
          color: 'red',
        },
      },
    },
    Menu: {
      styles: {
        item: {
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '16px',
          paddingRight: '16px',
          marginBottom: '6px',
          borderRadius: '6px',
          fontSize: '16px',
        },
        dropdown: {
          padding: '12px',
        },
      },
    },
    Table: {
      styles: {
        root: {
          borderCollapse: 'collapse',
          border: '1px solid #dee2e6',
        },
        th: {
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          padding: '8px',
          textAlign: 'left',
        },
        td: {
          borderBottom: '1px solid #dee2e6',
          padding: '8px',
        },
      },
    },
  },
};
