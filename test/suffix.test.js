import { DEFAULT_PRETTIER_OPTIONS, generator } from '../src/index';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import yaml from 'js-yaml';

jest.mock( 'commander', () => ( {
  exact: false,
  arguments: jest.fn().mockReturnThis(),
  option: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(),
  parse: jest.fn().mockReturnThis(),
  suffix: 'Type'
} ) );

describe( 'generate flow types', () => {
  describe( 'with --suffix', () => {
    it( 'should generate expected flow types', () => {
      const file = path.join( __dirname, '__mocks__/openapi.yaml' );
      const content = yaml.safeLoad( fs.readFileSync( file, 'utf8' ) );
      const expected = path.join( __dirname, '__mocks__/suffix/expected.yaml.flow.js' );
      const expectedString = prettier.format( fs.readFileSync( expected, 'utf8' ), DEFAULT_PRETTIER_OPTIONS );
      expect( generator( content ) ).toEqual( expectedString );
    } );

    it( 'should generate expected flow types from openapi.json', () => {
      const file = path.join( __dirname, '__mocks__/openapi.json' );
      const content = JSON.parse( fs.readFileSync( file, 'utf8' ) );
      const expected = path.join( __dirname, '__mocks__/suffix/expected.json.flow.js' );
      const expectedString = prettier.format( fs.readFileSync( expected, 'utf8' ), DEFAULT_PRETTIER_OPTIONS );
      expect( generator( content ) ).toEqual( expectedString );
    } );
  } );
} );
