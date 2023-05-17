<div class="spinner" />

<style>
  .spinner {
    width: 10vh;
    height: 10vh;
    border-radius: 50%;
    background-color: transparent;
    border: 2% solid #fff;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
