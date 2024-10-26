import { ref, onBeforeMount, onUnmounted } from "vue";

export const useTimer = (initialTime) => {
  // the initialTime is in seconds
  const initialSeconds = ref(initialTime);
  const totalTime = ref(Math.floor(initialSeconds.value));
  const timeRemaining = ref(totalTime.value > 0);

  let timer;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      Math.floor(remainingSeconds)
    ).padStart(2, "0")}`;
  };

  const displayTime = ref(formatTime(totalTime.value));

  const startTimer = () => {
    timer = setInterval(() => {
      if (totalTime.value > 0) {
        totalTime.value -= 1;
        displayTime.value = formatTime(totalTime.value);
        timeRemaining.value = totalTime.value > 0;
      } else {
        clearInterval(timer);
        timeRemaining.value = false;
      }
    }, 1000);
  };

  const restartTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    totalTime.value = Math.floor(initialSeconds.value);
    displayTime.value = formatTime(totalTime.value);
    timeRemaining.value = totalTime.value > 0;
    startTimer();
  };

  onBeforeMount(() => {
    startTimer();
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  return {
    displayTime,
    timeRemaining,
    restartTimer,
  };
};
