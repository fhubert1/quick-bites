import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { describe, it, expect } from 'vitest';
describe('Vite Config', () => {
  it('should be correctly configured', () => {
    const config =defineConfig({
        plugins: [react()],
        server: {
          port: 3000,
          open: true,
          proxy: {
            '/graphql': {
              target: 'http://localhost:3001',
              secure: false,
              changeOrigin: true
            }
          }
        },
        css:{
          modules:{
            localsConvention:"camelCase",
          },
        },
      });
      
    // const config = defineConfig({
    //   plugins: [react()],
    //   server: {
    //     port: 3000,
    //     open: true,
    //     proxy: {
    //       '/graphql': {
    //         target: 'http://localhost:3001',
    //         secure: false,
    //         changeOrigin: true
    //       }
    //     }
    //   }
    // });
    expect(config.server.port).toBe(3000);
    expect(config.server.proxy['/graphql'].target).toBe('http://localhost:3001');
    expect(config.server.proxy['/graphql'].secure).toBe(false);
    expect(config.server.proxy['/graphql'].changeOrigin).toBe(true);
  });
});