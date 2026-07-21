use clap::{Parser, Subcommand};
use std::path::PathBuf;

mod cmd_config;
mod cmd_status;
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
    /// Show request stats and cost summary
    Status {
        #[arg(long, default_value = "groat.db")]
        db_path: PathBuf,
    },
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
        Commands::Status { db_path } => cmd_status::run(db_path).await,
        Commands::Config => cmd_config::run(),
        Commands::Version => cmd_version::run(),
    }
}