import { render, screen } from '@testing-library/react';
import { SwitchDiretctive, CaseDirective } from './SwitchComponent';

// Testando se o SwitchDiretctive renderiza o conteúdo correto para uma condição específica
describe('SwitchDiretctive and CaseDirective components', () => {
  test('Renderiza o conteúdo correto quando a condição corresponde a um Case', () => {
    render(
      <SwitchDiretctive condition="success">
        <CaseDirective value="loading">
          <p>Carregando...</p>
        </CaseDirective>
        <CaseDirective value="success">
          <p>Carregamento concluído!</p>
        </CaseDirective>
        <CaseDirective value="error">
          <p>Erro ao carregar dados.</p>
        </CaseDirective>
      </SwitchDiretctive>
    );

    // Verifica se o texto 'Carregamento concluído!' foi renderizado
    expect(screen.getByText('Carregamento concluído!')).toBeInTheDocument();
  });

  test('Não renderiza nada se nenhuma condição corresponder a um Case', () => {
    const { container } = render(
      <SwitchDiretctive condition="idle">
        <CaseDirective value="loading">
          <p>Carregando...</p>
        </CaseDirective>
        <CaseDirective value="success">
          <p>Carregamento concluído!</p>
        </CaseDirective>
        <CaseDirective value="error">
          <p>Erro ao carregar dados.</p>
        </CaseDirective>
      </SwitchDiretctive>
    );

    // Verifica se nenhum conteúdo foi renderizado, já que a condição não combina com nenhum CaseDirective
    expect(container).toBeEmptyDOMElement();
  });

  test('Renderiza corretamente para um Case diferente baseado na condição', () => {
    render(
      <SwitchDiretctive condition="error">
        <CaseDirective value="loading">
          <p>Carregando...</p>
        </CaseDirective>
        <CaseDirective value="success">
          <p>Carregamento concluído!</p>
        </CaseDirective>
        <CaseDirective value="error">
          <p>Erro ao carregar dados.</p>
        </CaseDirective>
      </SwitchDiretctive>
    );

    // Verifica se o texto 'Erro ao carregar dados.' foi renderizado
    expect(screen.getByText('Erro ao carregar dados.')).toBeInTheDocument();
  });
});
