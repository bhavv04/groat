use clap::{Parser, Subcommand};

mod cmd_config;
mod cmd_up;
mod cmd_version;

#[derive(Parser)]
#[command(name = "groat", about = "Every token counts.")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Start the Groat proxy server
    Up(cmd_up::UpArgs),
    /// Show current configuration
    Config,
    /// Show version
    Version,
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Up(args) => cmd_up::run(args).await,
        Commands::Config => cmd_config::run(),
        Commands::Version => cmd_version::run(),
    }
}