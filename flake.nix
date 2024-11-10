{
  description = "Frontend - Space page";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    # nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable"; # Webstorm is only 'free' in channels newer than 24.05
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        # pkgs = import nixpkgs {
        #   inherit system;
        #   # config.allowUnfree = true; # not neccessary unless we need Webstorm in a dev shell
        # };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [];

          nativeBuildInputs = with pkgs; [
            git
            deno
            # local webp compressor through cwebp
            libwebp
          ];
          shellHook = ''
            echo "Flake shell active..."
          '';
        };
      }
    );
}
