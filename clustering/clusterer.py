# I used this aplication of the k-mean clustering from my own github: https://github.com/fatorius/Clusterer
# -hugosouza

import seaborn as sns
import pandas as pd
from matplotlib import pyplot as plt
from math import log
from math import sqrt
from math import pow
from statistics import stdev
from statistics import mean
from random import uniform

def euclidean_distance(x1, x2, y1, y2):
    return sqrt(pow(x1-x2, 2) + pow(y1-y2, 2))

class Data:
    def __init__(self, x: list, y: list, number_of_clusters: int = None):
        self.data = pd.DataFrame(data={"x": x, "y": y}) 
        
        self.x_max = max(self.data.x)
        self.x_min = min(self.data.x)

        self.y_max = max(self.data.y)
        self.y_min = min(self.data.y)

        self.centroids = []
        self.number_of_clusters = number_of_clusters

    # Ploting data

    def plot(self):
        sns.scatterplot(self.data.x, self.data.y)
        plt.show()

    def k_means(self, k=2, similiarity:callable=euclidean_distance, max_steps:int=0):
        def choose_centroid():
            return [uniform(self.x_min, self.x_max), uniform(self.y_min, self.y_max)]
        
        def find_nearest_centroid(centroids, sample):
            nearest = 0
            smallest_distance = 100000000 
            for centroid in range(len(centroids)):
                new_distence = similiarity(centroids[centroid][0], sample[0], centroids[centroid][1], sample[1])
                if new_distence < smallest_distance:
                    nearest = centroid
                    smallest_distance = new_distence

            distances.append(smallest_distance)

            return nearest 
                
        def define_new_centroids(clusters):
            self.centroids.clear()
            for cluster in clusters:
                sum_x = 0
                sum_y = 0
                for item in cluster:
                    sum_x += item[0]
                    sum_y += item[1]
                try:
                    self.centroids.append([sum_x/len(cluster), sum_y/len(cluster)])            
                except ZeroDivisionError:
                    self.centroids.append(choose_centroid())

        self.centroids.clear()
        self.number_of_clusters = k
        clusters = []
        distances = []

        for _ in range(self.number_of_clusters):
            self.centroids.append(choose_centroid())
            clusters.append([])

        step = 1
        last_distance = 100000000
        while True:
            # assign each point to a centroid
            distances.clear()

            for sample in range(len(self.data.x)):
                clusters[find_nearest_centroid(self.centroids, [self.data.x[sample], self.data.y[sample]])].append([self.data.x[sample], self.data.y[sample]])

            mean_distance = mean(distances)

            if mean_distance >= last_distance or step == max_steps:
                break
            else:
                last_distance = mean_distance

            print("Step {}, average distance: {}".format(step, mean_distance))

            define_new_centroids(clusters)

            step += 1
