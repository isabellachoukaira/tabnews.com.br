import { render, screen } from '@testing-library/react';

import ContentList from 'pages/interface/components/ContentList';

describe('ContentList - Diferenciação visual de posts', () => {
  const mockPost = {
    id: 'abc123',
    title: 'Publicação de Teste',
    slug: 'teste-publicacao',
    owner_username: 'usuario1',
    parent_id: null,
    tabcoins_credit: 10,
    tabcoins_debit: 0,
    tabcoins: 10,
    children_deep_count: 2,
    published_at: new Date().toISOString(),
    type: 'post',
    body: '',
  };

  const mockPagination = {
    perPage: 10,
    currentPage: 1,
    nextPage: null,
  };

  it('deve renderizar o link com href correto', () => {
    render(
      <ContentList
        contentList={[mockPost]}
        pagination={mockPagination}
        paginationBasePath="/pagina"
        ad={null}
        emptyStateProps={{}}
      />,
    );

    const link = screen.getByRole('link', { name: /publicação de teste/i });

    // Verifica se o link foi renderizado
    expect(link).toBeDefined();
    expect(link).not.toBeNull();

    // Verifica se o href está correto (usando `.getAttribute`)
    const href = link.getAttribute('href');
    expect(href).toBe('/usuario1/teste-publicacao');
  });

  it('deve renderizar posts não visitados com fonte semibold', () => {
    render(<ContentList contentList={[mockPost]} pagination={mockPagination} />);

    const link = screen.getByRole('link', { name: /publicação de teste/i });
    expect(window.getComputedStyle(link).fontWeight).toBe('semibold'); // semibold
  });

  it('deve renderizar posts visitados com fonte normal', () => {
    // Mock do localStorage com o post visitado
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(['abc123']));
    render(<ContentList contentList={[mockPost]} pagination={mockPagination} />);

    const link = screen.getByRole('link', { name: /publicação de teste/i });
    expect(window.getComputedStyle(link).fontWeight).toBe('normal'); // normal
  });
});
