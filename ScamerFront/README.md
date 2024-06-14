# Publicar em homologação
npm run publish:hom

# Publicação em produção
npm run publish

# Para testar localmente
ng serve -c hom
ng serve -c dev

# Scripts analytics e hotjar
- Quando publicado em produção, o projeto irá usar index.prod.html com os scripts vinculados
- Em desenvolvimento, ele não insere os scripts para não gerar tráfego