/**
 * Линейная интерполяция двух значений
 * @param x Первое значение
 * @param y Второе значение
 * @param alpha Вес интерполяции
 */
export function lerp(x: number, y: number, alpha: number) {
    return x + (y - x) * alpha;
}

/**
 * Обратная интерполяция значений в 0-1
 * @param value Изначальное значение
 * @param from Нижняя граница
 * @param to Верхняя граница
 */
export function invLerp(value: number, from: number, to: number) {
    return saturate((value - from) / (to - from));
}

/**
 * Ограничение значения по верхнему и нижнему пределу
 * @param x Значение
 * @param min Нижний предел
 * @param max Верхний предел
 */
export function clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max);
}

/**
 * Ограничение значения в диапазон (0-1)
 * @param x Значение
 */
export function saturate(x: number) {
    return clamp(x, 0, 1);
}

/**
 * Евклидов модуль (положительный остаток от деления)
 * @param n Изначальное значение
 * @param m Делитель
 */
export function euclideanModulo(n: number, m: number) {
    return ((n % m) + m) % m;
}

/**
 * Плавное дампирование значения к другому значению
 * @param x Исходное значение
 * @param y Целевое число
 * @param lambda Множитель интерполяции
 * @param dt Кадровый множитель
 */
export function damp(x: number, y: number, lambda: number, dt: number) {
    return lerp(x, y, 1 - Math.exp(-lambda * dt));
}

/**
 * Генерация случайного целого числа
 * @param minOrMax Нижний порог (или верхний, если не задан параметр max)
 * @param max Верхний порог
 */
export function randomInt(minOrMax: number, max?: number) {
    let from = 0;
    let to = minOrMax;
    if (max !== undefined) {
        from = minOrMax;
        to = max;
    }

    return Math.floor(Math.random() * (to - from)) + from;
}

/**
 * Создание кватерниона из углов Эйлера в последовательности (ZXY)
 * @param eulerDegrees Вектор с углами Эйлера
 */
// Требуется пакет gl-matrix
// export function quatFromEuler(eulerDegrees: vec3) {
//     const deg2rad = Math.PI / 180;
//
//     const rotation = quat.create();
//     quat.rotateY(rotation, rotation, eulerDegrees[1] * deg2rad);
//     quat.rotateX(rotation, rotation, eulerDegrees[0] * deg2rad);
//     quat.rotateZ(rotation, rotation, eulerDegrees[2] * deg2rad);
//
//     return rotation;
// }
